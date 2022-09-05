import { anchorType } from '@antv/l7-utils';
import EventEmitter from 'eventemitter3';
import { Container } from 'inversify';
import { ILngLat } from '../map/IMapService';

export interface IPopupOption {
  closeButton: boolean;
  closeButtonOffsets?: [number, number];
  closeOnClick: boolean;
  closeOnEsc: boolean;
  maxWidth: string;
  anchor: anchorType[any];
  offsets: number[];
  stopPropagation: boolean;
  autoPan: boolean;
  autoClose: boolean;
  className?: string;
  style?: string;
}

export interface IPopup extends EventEmitter {
  autoClose: boolean;
  isDestroy: boolean;
  addTo(scene: Container): this;
  remove(): void;
  setLnglat(lngLat: ILngLat): this;
  getLnglat(): ILngLat;
  setHTML(html: string | HTMLElement | HTMLElement[]): this;
  setText(text: string): this;
  setMaxWidth(maxWidth: string): this;
  isOpen(): boolean;
  open(): void;
  close(): void;
}

export interface IPopupService {
  addPopup(popup: IPopup): void;
  removePopup(popup: IPopup): void;
  init(scene: Container): void;
  initPopup(): void;
  destroy(): void;
}
