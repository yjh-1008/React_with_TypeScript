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


class ProjectInput{
  
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLTextAreaElement;
  peopleInputElement: HTMLInputElement;
  constructor(){
    this.templateElement =<HTMLTemplateElement> document.getElementById("project-input")!;
    this.hostElement = <HTMLDivElement> document.getElementById("app")!;

    const importedNode = document.importNode(this.templateElement.content,true);
    this.element = <HTMLFormElement> importedNode.firstElementChild;
    this.element.id = 'user-input';
    this.titleInputElement = <HTMLInputElement> this.element.querySelector('#title')!;
    this.descriptionInputElement = <HTMLTextAreaElement> this.element.querySelector('#description')!;
    this.peopleInputElement = <HTMLInputElement> this.element.querySelector('#people')!;
    this.configure();
    this.attach();
  }

  private clearInput(){
    this.titleInputElement.value='';
    this.descriptionInputElement.value=''
    this.peopleInputElement.value='';
  }

  private getUserInput():[string,string,number]|void{
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;
    if(enteredTitle.trim().length === 0 ||
     enteredDescription.trim().length ===0 ||
      enteredPeople.trim().length===0){
        alert('invaild input');
        return 
    }else{

      return [enteredTitle,enteredDescription, +enteredPeople];
    }
  }



  @autobind
  private submitHandler(event:Event){
    event.preventDefault();
    const userInput = this.getUserInput();
    if(userInput instanceof Array){
      console.log("not here")
      const [title,description,people] = userInput;
      console.log(title,description,people);
    }
  }

  private configure(){
    this.element.addEventListener('submit',this.submitHandler);
  }

 private attach(){
  this.hostElement.insertAdjacentElement('afterbegin',this.element);
 }
}

const prjInput = new ProjectInput();