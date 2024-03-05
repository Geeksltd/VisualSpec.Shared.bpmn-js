import ExElementFactory from './ExElementFactory';
import './ExPaletteProvider';
import ExContextPadProvider from './ExContextPadProvider';
import LabelEditingPreview from './ExLabelEditingPreview';
import ResizeStep from './ResizeStep';
import ResizeEvent from './ResizeEvent';

export default {
  __init__: [ 'ExElementFactory','ExContextPadProvider','LabelEditingPreview','ResizeStep', 'ResizeEvent'],
    ExElementFactory: [ 'type', ExElementFactory ],
  ExContextPadProvider: [ 'type', ExContextPadProvider ],
  LabelEditingPreview:['type', LabelEditingPreview ],
  ResizeStep: [ 'type', ResizeStep ],
  ResizeEvent: [ 'type', ResizeEvent ]
};
