import diagramXML from './resources/Diagram.bpmn';
import vsbpmn from './bpmn';

var container = document.getElementById('js-canvas');

var modeler = new vsbpmn(container,diagramXML);
