import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import {
  append as svgAppend,
  classes as svgClasses
} from 'tiny-svg';

import {
  assign
} from 'min-dash';

import {
  getSemantic,
  getFillColor,
  getStrokeColor,
  getLabelColor
} from 'bpmn-js/lib/draw/BpmnRenderUtil';

import {  isExpanded  } from 'bpmn-js/lib/util/DiUtil';
  
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import {  createLine } from 'diagram-js/lib/util/RenderUtil';

const HIGH_PRIORITY = 1500,
  DEFAULT_FILL_OPACITY = .95;
  var computeStyle,
  textRenderer;

export default class VerticalParticipantRenderer extends BaseRenderer {
  constructor(eventBus,bpmnRenderer,styles,textRenderer) {
    super(eventBus, HIGH_PRIORITY);
    this.bpmnRenderer = bpmnRenderer;
    computeStyle = styles.computeStyle;
    this.textRenderer = textRenderer;
  }

  canRender(element) {
    // only render tasks and events (ignore labels)
    return isAny(element, [ 'bpmn:Participant']) && !element.labelTarget;
  }


  drawShape(parentGfx, element) {
     //const shape = this.bpmnRenderer.drawShape(parentNode, element);
    // return shape;
    var attrs = {
      fillOpacity: DEFAULT_FILL_OPACITY,
      fill: getFillColor(element, this.bpmnRenderer.defaultFillColor),
      stroke: getStrokeColor(element, this.bpmnRenderer.defaultStrokeColor)
    };
    
    var lane = this.renderer('bpmn:Lane')(parentGfx, element, attrs);

    var expandedPool = isExpanded(element);

    if (expandedPool) {
      this.drawLine(parentGfx, [
        { x: 0, y: 30 },
        { x: element.width, y: 30 }
      ], {
        stroke: getStrokeColor(element, this.bpmnRenderer.defaultStrokeColor)
      });
      var text = getSemantic(element).name;
      this.renderLaneLabel(parentGfx, text, element);
    } else {

      // Collapsed pool draw text inline
      var text2 = getSemantic(element).name;
      this.bpmnRenderer.renderLabel(parentGfx, text2, {
        box: element, align: 'center-middle',
        style: {
          fill: getLabelColor(element, this.bpmnRenderer.defaultLabelColor, this.bpmnRenderer.defaultStrokeColor)
        }
      });
    }

    var participantMultiplicity = !!(getSemantic(element).participantMultiplicity);

    if (participantMultiplicity) {
      this.renderer('ParticipantMultiplicityMarker')(parentGfx, element);
    }

    return lane;

  }
 
  renderer(type) {
    return this.bpmnRenderer.handlers[type];
  }

  drawLine(parentGfx, waypoints, attrs) {
    attrs = computeStyle(attrs, [ 'no-fill' ], {
      stroke: 'black',
      strokeWidth: 2,
      fill: 'none'
    });
  
    var line = createLine(waypoints, attrs);
  
    svgAppend(parentGfx, line);
  
    return line;
  }

  renderLaneLabel(parentGfx, text, element) {
    var textBox = this.renderLabel(parentGfx, text, {
      box: {
        height: 30,
        width: element.width
      },
      align: 'center-middle',
      style: {
        fill: getLabelColor(element, this.bpmnRenderer.defaultLabelColor, this.bpmnRenderer.defaultStrokeColor)
      }
    });
  }

  renderLabel(parentGfx, label, options) {

    options = assign({
      size: {
        width: parentGfx.width,
      }
    }, options);

    var text = this.textRenderer.createText(label || 'Actor/Integration', options);

    svgClasses(text).add('djs-label');

    svgAppend(parentGfx, text);

    return text;
  }
}




VerticalParticipantRenderer.$inject = [ 'eventBus', 'bpmnRenderer','styles','textRenderer' ];