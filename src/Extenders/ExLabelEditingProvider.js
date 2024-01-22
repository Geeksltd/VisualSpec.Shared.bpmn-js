  
import { is } from 'bpmn-js/lib/util/ModelUtil';
import LabelEditingProvider from 'bpmn-js/lib/features/label-editing/LabelEditingProvider';
import { isExpanded } from 'bpmn-js/lib/util/DiUtil';
import {  assign} from 'min-dash';
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
import { isLabelExternal,hasExternalLabel,getExternalLabelMid } from 'bpmn-js/lib/util/LabelUtil';
import BpmnInteractionEvents from "bpmn-js/lib/features/interaction-events/BpmnInteractionEvents"
/**
 * Get the editing bounding box based on the element's size and position.
 *
 * @param {Element} element
 *
 * @return {DirectEditingContext}
 */
LabelEditingProvider.prototype.getEditingBBox = function(element) {

  var canvas = this._canvas;

  var target = element.label || element;

  var bbox = canvas.getAbsoluteBBox(target);

  var mid = {
    x: bbox.x + bbox.width / 2,
    y: bbox.y + bbox.height / 2
  };

  // default position
  var bounds = { x: bbox.x, y: bbox.y };

  var zoom = canvas.zoom();

  var defaultStyle = this._textRenderer.getDefaultStyle(),
      externalStyle = this._textRenderer.getExternalStyle();

  // take zoom into account
  var externalFontSize = externalStyle.fontSize * zoom,
      externalLineHeight = externalStyle.lineHeight,
      defaultFontSize = defaultStyle.fontSize * zoom,
      defaultLineHeight = defaultStyle.lineHeight;

  var style = {
    fontFamily: this._textRenderer.getDefaultStyle().fontFamily,
    fontWeight: this._textRenderer.getDefaultStyle().fontWeight
  };

  // adjust for expanded pools AND lanes
  if (is(element, 'bpmn:Lane') || isExpandedPool(element)) {

    assign(bounds, {
      width: bbox.width,
      height: 30 * zoom,
    });

    assign(style, {
      fontSize: defaultFontSize + 'px',
      lineHeight: defaultLineHeight,
      paddingTop: (7 * zoom) + 'px',
      paddingBottom: (7 * zoom) + 'px',
      paddingLeft: (5 * zoom) + 'px',
      paddingRight: (5 * zoom) + 'px',
    });
  }


  // internal labels for tasks and collapsed call activities,
  // sub processes and participants
  if (isAny(element, [ 'bpmn:Task', 'bpmn:CallActivity' ]) ||
      isCollapsedPool(element) ||
      isCollapsedSubProcess(element)) {

    assign(bounds, {
      width: bbox.width,
      height: bbox.height
    });

    assign(style, {
      fontSize: defaultFontSize + 'px',
      lineHeight: defaultLineHeight,
      paddingTop: (7 * zoom) + 'px',
      paddingBottom: (7 * zoom) + 'px',
      paddingLeft: (5 * zoom) + 'px',
      paddingRight: (5 * zoom) + 'px'
    });
  }


  // internal labels for expanded sub processes
  if (isExpandedSubProcess(element)) {
    assign(bounds, {
      width: bbox.width,
      x: bbox.x
    });

    assign(style, {
      fontSize: defaultFontSize + 'px',
      lineHeight: defaultLineHeight,
      paddingTop: (7 * zoom) + 'px',
      paddingBottom: (7 * zoom) + 'px',
      paddingLeft: (5 * zoom) + 'px',
      paddingRight: (5 * zoom) + 'px'
    });
  }

  var width = 90 * zoom,
      paddingTop = 7 * zoom,
      paddingBottom = 4 * zoom;

  // external labels for events, data elements, gateways, groups and connections
  if (target.labelTarget) {
    assign(bounds, {
      width: width,
      height: bbox.height + paddingTop + paddingBottom,
      x: mid.x - width / 2,
      y: bbox.y - paddingTop
    });

    assign(style, {
      fontSize: externalFontSize + 'px',
      lineHeight: externalLineHeight,
      paddingTop: paddingTop + 'px',
      paddingBottom: paddingBottom + 'px'
    });
  }

  // external label not yet created
  if (isLabelExternal(target)
      && !hasExternalLabel(target)
      && !isLabel(target)) {

    var externalLabelMid = getExternalLabelMid(element);

    var absoluteBBox = canvas.getAbsoluteBBox({
      x: externalLabelMid.x,
      y: externalLabelMid.y,
      width: 0,
      height: 0
    });

    var height = externalFontSize + paddingTop + paddingBottom;

    assign(bounds, {
      width: width,
      height: height,
      x: absoluteBBox.x - width / 2,
      y: absoluteBBox.y - height / 2
    });

    assign(style, {
      fontSize: externalFontSize + 'px',
      lineHeight: externalLineHeight,
      paddingTop: paddingTop + 'px',
      paddingBottom: paddingBottom + 'px'
    });
  }

  // text annotations
  if (is(element, 'bpmn:TextAnnotation')) {
    assign(bounds, {
      width: bbox.width,
      height: bbox.height,
      minWidth: 30 * zoom,
      minHeight: 10 * zoom
    });

    assign(style, {
      textAlign: 'left',
      paddingTop: (5 * zoom) + 'px',
      paddingBottom: (7 * zoom) + 'px',
      paddingLeft: (7 * zoom) + 'px',
      paddingRight: (5 * zoom) + 'px',
      fontSize: defaultFontSize + 'px',
      lineHeight: defaultLineHeight
    });
  }

  return { bounds: bounds, style: style };
};

function isExpandedPool(element) {
  return is(element, 'bpmn:Participant') && isExpanded(element);
}
function isCollapsedPool(element) {
  return is(element, 'bpmn:Participant') && !isExpanded(element);
}

function isCollapsedSubProcess(element) {
  return is(element, 'bpmn:SubProcess') && !isExpanded(element);
}

function isExpandedSubProcess(element) {
  return is(element, 'bpmn:SubProcess') && isExpanded(element);
}

var LABEL_HEIGHT = 30;

BpmnInteractionEvents.prototype._createParticipantHit = function(element, gfx) {

  // remove existing hits
  this._interactionEvents.removeHits(gfx);

  // add body hit
  this._interactionEvents.createBoxHit(gfx, 'no-move', {
    width: element.width,
    height: element.height
  });

  // add outline hit
  this._interactionEvents.createBoxHit(gfx, 'click-stroke', {
    width: element.width,
    height: element.height
  });

  // add label hit
  this._interactionEvents.createBoxHit(gfx, 'all', {
    width: element.height,
    height: LABEL_HEIGHT
  });

  // indicate that we created a hit
  return true;
};