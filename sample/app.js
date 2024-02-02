import diagramXML from './resources/testDiagram.bpmn';
import diagramXML2 from './resources/diagram.bpmn';
// import vsbpmn from '../src/vsbpmn';
// import vsbpmnViewer from '../src/vsbpmnViewer';
import {vsbpmn,vsbpmnViewer} from '../src/index';

//var container = document.getElementById('js-canvas');
var bpmn = new vsbpmn('js-canvas',"testPersist");
window["bpmn"] = bpmn;
bpmn.loadXml(diagramXML).then(()=> {
    //bpmn.createWorkflowModelParticipant("test",1,9);
} );

bpmn.eventBus.on("commandStack.elements.create.canExecute",99999,e=> {return true});

let _self = this;
bpmn.eventBus.on(["shape.added","shape.removed","shape.changed","hand.init"],f=>{
    console.log(f.type + " raised");
    setTimeout(async ()=> {
    let result = await bpmn.modeler.saveXML({format:true});
    let {xml} = result;
    console.log(xml);
},3000);
});
window["rerender"] = function rerender()
{
    var parent = document.getElementById('js-canvas').parentElement;
    parent.innerHTML = '';
    let newElement = document.createElement("div");
    newElement.id = 'js-canvas';
    parent.appendChild(newElement)
    bpmn = new vsbpmn('js-canvas',"testPersist");
    window["bpmn"] = bpmn;

    bpmn.eventBus.on("commandStack.elements.create.canExecute",99999,e=> {return true});

    bpmn.loadXml(diagramXML2).then(()=> {
        
    } );

    console.log("rerendered");
}

var bpmnViewer = new vsbpmnViewer('js-canvasReadonly',"testPersist_readonly");
bpmnViewer.loadXml(diagramXML).then(()=> {
    //bpmn.createWorkflowModelParticipant("test",1,9);
} );