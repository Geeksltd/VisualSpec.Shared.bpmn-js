import {is} from 'bpmn-js/lib/util/ModelUtil';
import {assign,forEach,isArray} from 'min-dash';

export default class ExContextPad {
    constructor(config, contextPad, create, elementFactory, injector, translate) {
      this.create = create;
      this.elementFactory = elementFactory;
      this.translate = translate;
  
      if (config.autoPlace !== false) {
        this.autoPlace = injector.get('autoPlace', false);
      }
  
      contextPad.registerProvider(this);
    }
  
    getContextPadEntries(element) {
      const {
        autoPlace,
        create,
        elementFactory,
        translate
      } = this;
      
      var actions = {};
      var businessObject = element.businessObject;
  
      function appendServiceTask(event, element) {
      //  if (autoPlace) {
          const shape = elementFactory.createShape({ type: 'bpmn:Transaction' });
    
      //    autoPlace.append(element, shape);
     //   } else {
          appendServiceTaskStart(event, element);
      //  }
      }
  
      function appendServiceTaskStart(event) {
        const shape = elementFactory.createShape({ type: 'bpmn:Transaction' });
        create.start(event, shape, element);
      }
      function TaskStart(event) {
        const shape = elementFactory.createShape({ type: 'bpmn:Task' });
        create.start(event, shape, element);
      }
      if (is(businessObject, 'bpmn:Transaction') || is(businessObject, 'bpmn:Task')) {
          assign(actions, {
          'append.Task': {
              group: 'artifact',
              className: 'bpmn-icon-task',
              title: translate('Append Task'),
              action: {
              click: TaskStart,
              dragstart: TaskStart
              }
          }
          }); 
          assign(actions, {
          'append.service-task': {
              group: 'artifact',
              className: 'bpmn-icon-transaction',
              title: translate('Append AssistanceSystem'),
              action: {
              click: appendServiceTask,
              dragstart: appendServiceTaskStart
              }
          }
          });
      }
      return actions;
    }
  }
  
  CustomContextPad.$inject = [
    'config',
    'contextPad',
    'create',
    'elementFactory',
    'injector',
    'translate'
  ];