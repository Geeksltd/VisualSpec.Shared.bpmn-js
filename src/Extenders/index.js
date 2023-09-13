import VerticalParticipantRenderer from './VerticalParticipantRenderer';
import ExElementFactory from './ExElementFactory';
import './ExPaletteProvider';
import './ExLabelEditingProvider';
import ExContextPadProvider from './ExContextPadProvider';
import LabelEditingPreview from './ExLabelEditingPreview';
import ResizeStep from './ResizeStep';
import ResizeEvent from './ResizeEvent';

export default {
  __init__: [ 'verticalParticipantRenderer','ExElementFactory','ExContextPadProvider','LabelEditingPreview','ResizeStep', 'ResizeEvent'],
  verticalParticipantRenderer: [ 'type', VerticalParticipantRenderer ],
  ExElementFactory: [ 'type', ExElementFactory ],
  ExContextPadProvider: [ 'type', ExContextPadProvider ],
  LabelEditingPreview:['type', LabelEditingPreview ],
  ResizeStep: [ 'type', ResizeStep ],
  ResizeEvent: [ 'type', ResizeEvent ]
};
