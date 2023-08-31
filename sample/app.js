import diagramXML from './resources/diagramWithoutColaborationOrDefaultProcess.bpmn';
import vsbpmn from '../src/bpmn';

var container = document.getElementById('js-canvas');

var bpmnViewer = new vsbpmn(container,"testPersist");
window["bpmnViewer"] = bpmnViewer;
bpmnViewer.loadXml(diagramXML).then(()=> {
    bpmnViewer.createWorkflowModelParticipant("test",1,9);
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