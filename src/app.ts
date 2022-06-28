class ProjectInput{
  templateElement:HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element:HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor(){
    
    this.templateElement = <HTMLTemplateElement> document.getElementById("project-input")!;
    this.hostElement = <HTMLDivElement> document.getElementById('app')!;
    
    const importNode = document.importNode(this.templateElement.content,true);
    this.element = <HTMLFormElement> importNode.firstElementChild;
    this.element.id = 'user-input';
    this.titleInputElement = <HTMLInputElement> this.element.querySelector('#title');
    this.descriptionElement = <HTMLInputElement> this.element.querySelector('#description');
    this.peopleInputElement = <HTMLInputElement> this.element.querySelector('#people');
    this.configure();
    this.attach();
  }
  private submitHandler(event:Event){
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }

  private configure(){
    this.element.addEventListener('submit', this.submitHandler.bind(this));
  }
  private attach(){
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();