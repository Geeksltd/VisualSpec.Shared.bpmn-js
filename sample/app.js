import diagramXML from './resources/testDiagram.bpmn';
import diagramXML2 from './resources/diagram.bpmn';
import vsbpmn from '../src/bpmn';

//var container = document.getElementById('js-canvas');

var bpmnViewer = new vsbpmn('js-canvas',"testPersist");
window["bpmnViewer"] = bpmnViewer;


bpmnViewer.loadXml(diagramXML).then(()=> {
    //bpmnViewer.createWorkflowModelParticipant("test",1,9);
} );

bpmnViewer.eventBus.on("commandStack.elements.create.canExecute",99999,e=> {return true});

let _self = this;
bpmnViewer.eventBus.on(["shape.added","shape.removed","shape.changed","hand.init"],f=>{
    console.log(f.type + " raised");
    setTimeout(async ()=> {
    let result = await bpmnViewer.modeler.saveXML({format:true});
    let {xml} = result;
    console.log(xml);
},3000);
});
window["rerender"] = function rerender()
{
    //bpmnViewer.dispose();
    //bpmnViewer = new vsbpmn(container,"testPersist");
    var parent = document.getElementById('js-canvas').parentElement;
    parent.innerHTML = '';
    let newElement = document.createElement("div");
    newElement.id = 'js-canvas';
    parent.appendChild(newElement)
    bpmnViewer = new vsbpmn('js-canvas',"testPersist");
    window["bpmnViewer"] = bpmnViewer;

    bpmnViewer.eventBus.on("commandStack.elements.create.canExecute",99999,e=> {return true});

    bpmnViewer.loadXml(diagramXML2).then(()=> {
        
    } );

    // let _self = this;
    // bpmnViewer.eventBus.on(["shape.added","shape.removed","shape.changed","hand.init"],f=>{
    //     console.log(f.type + " raised");
    //     setTimeout(async ()=> {
    //     let result = await bpmnViewer.modeler.saveXML({format:true});
    //     let {xml} = result;
    //     console.log(xml);
    // },3000);
    // });
    
    console.log("rerendered");
}