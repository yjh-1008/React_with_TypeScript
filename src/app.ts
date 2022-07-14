enum ProjectStatus{
  Active,
  Finished
}

//project type
class Project{
  constructor(public id:string,
     public title:string, 
     public description:string, 
     public people:number,
     public status:ProjectStatus){

  }
}

type Listener<T> = (items: Project[]) => void;

class State<T>{

  protected listeners:Listener<T>[] = [];
  addListener(listenerFn: Listener<T>){
    this.listeners.push(listenerFn);
  }
}

// Project State Management
class ProjectState extends State<Project>{
  private projects:any[]=[];
  private static instance:ProjectState

  private constructor(){
    super();
  }

  static getInstance(){
    if(this.instance){
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }
  
  addProject(title:string, description:string, numberOfPeople:number){
    const newProject = new Project(
      Math.random().toString()
    ,title
    , description
    , numberOfPeople
    ,ProjectStatus.Active)
    this.projects.push(newProject);
    for(const listenerFn of this.listeners){
      listenerFn(this.projects.slice());
    }
  }
}

const projectState :ProjectState = ProjectState.getInstance();

//validation
interface Validatable{
  value:string | number,
  required?:boolean,
  minLength?:number,
  maxLength?:number,
  min?:number,
  max?:number
}

function validate(validatableInput: Validatable){
  let isValid = true;
  if(validatableInput.required){
    if(typeof validatableInput.value === 'string'){
      console.log('1')
      isValid = isValid && validatableInput.value.trim().length !== 0;
    }

    if(validatableInput.minLength != null && validatableInput.value === 'string'){
      console.log('2')
      isValid = isValid && validatableInput.value.length > validatableInput.minLength
    }
    if(validatableInput.maxLength != null && validatableInput.value === 'string'){
      console.log('3')
      isValid = isValid && validatableInput.value.length < validatableInput.maxLength
    }

    if(validatableInput.min != null && typeof validatableInput.value === 'number'){
      console.log('4')
      isValid = isValid && validatableInput.value > validatableInput.min
    }

    if(validatableInput.max != null && typeof validatableInput.value === 'number'){
      console.log('5')
      isValid = isValid && validatableInput.value < validatableInput.max
    }
  }
  if(isValid){
    console.log(validatableInput)
  }
  return isValid
}

function autobind(_: any, _2: string,descriptor: PropertyDescriptor){
  const originalMethod = descriptor.value;

  const adjDescriptor:PropertyDescriptor ={
    configurable:true,
    get(){
      console.log(this);
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}

abstract class Component<T extends HTMLElement,U extends HTMLElement>{
  templateElement : HTMLTemplateElement;
  hostElement: T;
  element: U; 
  constructor(
    templateId: string,
     hostElementId:string,
     insertAtStart: boolean,
      newElementId?:string,
      ){
    this.templateElement = <HTMLTemplateElement> document.getElementById(templateId)!
    this.hostElement = <T> document.getElementById(hostElementId)!
    const importNode = document.importNode(this.templateElement.content, true);
    this.element = <U> importNode.firstElementChild!
    if(newElementId){
      this.element.id = newElementId;
    }
    this.attach(insertAtStart);
    
  }

  private attach(insertAtBeginning:boolean){
    this.hostElement.insertAdjacentElement(
      insertAtBeginning? 'afterbegin':'beforeend',
      this.element);
  }


  abstract configure():void;
  abstract renderContent():void;
}

//ProjectList
class ProjectList extends Component<HTMLDivElement, HTMLElement>{
  assignedProjects: Project[];
  constructor(private type: 'active' | 'finished'){
    super('project-list','app',false,`${ type}-projects`);
    this.assignedProjects=[];
    this.configure();
    this.renderContent();
  }

  configure(): void {
    projectState.addListener((projects:Project[])=>{
      const relavantProjects = projects.filter(prj=>{
        console.log(this.type)
        if(this.type === 'active')
        {
          return prj.status === ProjectStatus.Active

        }else{
          return prj.status === ProjectStatus.Finished
        }
      });
      this.assignedProjects = relavantProjects;
      this.renderProjects();
    });
  }

  renderProjects(){
    const listEl = <HTMLUListElement> document.getElementById(`${this.type}-projects-list`)!;
    listEl.innerHTML = '';
    for(const prjItem of this.assignedProjects){
      const listItem = document.createElement('li');
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem);
    }
  }  

 renderContent(){
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase()+' PROJECTS';
  }

  
}



//ProjectInput
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLTextAreaElement;
  peopleInputElement: HTMLInputElement;
  constructor(){
    super('project-input','app',true,'user-input')
    this.titleInputElement = <HTMLInputElement> this.element.querySelector('#title')!;
    this.descriptionInputElement = <HTMLTextAreaElement> this.element.querySelector('#description')!;
    this.peopleInputElement = <HTMLInputElement> this.element.querySelector('#people')!;
    this.configure();

  }
  configure(){  
    this.element.addEventListener('submit',this.submitHandler);
  }

  renderContent(): void {}
  private clearInput(){
    this.titleInputElement.value='';
    this.descriptionInputElement.value=''
    this.peopleInputElement.value='';
  }

  private getUserInput():[string,string,number]|void{

    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable:Validatable = {
      value:enteredTitle,
      required:true
    };

    const descriptionValidatable:Validatable = {
      value:enteredDescription,
      required:true,
      minLength:5
    };

    const peopleValidatable:Validatable = {
      value: +enteredPeople,
      required:true,
      min:1
    };

    if(validate(titleValidatable) &&
    (validate(descriptionValidatable)) &&
    (validate(peopleValidatable))) {
      return [enteredTitle,enteredDescription, +enteredPeople];
    }else{
      console.log(validate(titleValidatable));
      console.log(validate(descriptionValidatable));
      console.log(validate(peopleValidatable));
      alert('invaild input');
      return 
      
    }
  }
  @autobind
  private submitHandler(event:Event){
    event.preventDefault();
    const userInput = this.getUserInput();
    if(userInput instanceof Array){
      const [title,description,people] = userInput;

      projectState.addProject(title,description,people)
      this.clearInput();
    }
  }
  
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList("finished");