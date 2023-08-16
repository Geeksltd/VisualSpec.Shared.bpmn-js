import VerticalParticipantRenderer from './VerticalParticipantRenderer';
import ExElementFactory from './ExElementFactory';
import './ExPaletteProvider';
import './ExLabelEditingProvider';

export default {
  __init__: [ 'verticalParticipantRenderer','ExElementFactory' ],
  verticalParticipantRenderer: [ 'type', VerticalParticipantRenderer ],
  ExElementFactory: [ 'type', ExElementFactory ]
};