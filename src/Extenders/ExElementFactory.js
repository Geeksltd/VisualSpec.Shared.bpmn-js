import ElementFactory from 'bpmn-js/lib/features/modeling/ElementFactory'; 
import { is } from 'bpmn-js/lib/util/ModelUtil';
import {  isObject,assign} from 'min-dash';

class ExElementFactory extends ElementFactory {
  constructor(bpmnFactory, moddle, translate, elementFactory) {
      super(bpmnFactory, moddle, translate);
      const backup_getDefaultSize = elementFactory.getDefaultSize;
      elementFactory.getDefaultSize = (element, di) => {
          if (is(element, 'bpmn:Participant')) {
              return { width: 350, height: 450};
          }
          return backup_getDefaultSize(element, di);
      }
      elementFactory.createParticipantShape = function(attrs) {

        if (!isObject(attrs)) {
          attrs = { isExpanded: attrs };
        }
      
        attrs = assign({ type: 'bpmn:Participant',isHorizontal:false }, attrs || {});
      
        // participants are expanded by default
        if (attrs.isExpanded !== false) {
          attrs.processRef = this._bpmnFactory.create('bpmn:Process');
        }
      
        return this.createShape(attrs);
      };
  }
}
ExElementFactory.$inject = [
  'bpmnFactory',
  'moddle',
  'translate',
  'elementFactory'
];
export default ExElementFactory