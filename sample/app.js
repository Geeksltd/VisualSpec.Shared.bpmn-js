import diagramXML from './resources/Diagram.bpmn';
import vsbpmn from '../src/bpmn';

var container = document.getElementById('js-canvas');

var modeler = new vsbpmn(container,diagramXML);
