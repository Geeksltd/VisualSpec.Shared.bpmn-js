import $ from 'jquery';

import BpmnModeler from 'bpmn-js/lib/Modeler';

import verticalParticipantRendererModule from './CustomRenderer';
import ExElementFactoryModule from './CustomRenderer';

import diagramXML from './resources/Diagram.bpmn';
import ZoomModule from './CustomRenderer/ZoomRenderer';

var container = document.getElementById('js-canvas');

var modeler = new BpmnModeler({
  container: container,
  // keyboard: {
  //   bindTo: window
  // },
  additionalModules: [
    verticalParticipantRendererModule,
    ExElementFactoryModule
  ]
});
//List of all events
new ZoomModule(modeler,container).render();

modeler.importXML(diagramXML).catch((err) => {
  if (err) {
    console.error(err);
  }
});