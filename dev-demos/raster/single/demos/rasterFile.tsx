// @ts-ignore
import { RasterLayer, Scene } from '@antv/l7';
// @ts-ignore
import { GaodeMap,Map } from '@antv/l7-maps';
import React, { useEffect } from 'react';
import * as GeoTIFF from 'geotiff';

async function getTiffData() {
  const response = await fetch(
    'https://gw.alipayobjects.com/os/rmsportal/XKgkjjGaAzRyKupCBiYW.dat',
  );
  const arrayBuffer = await response.arrayBuffer();
  return arrayBuffer;
}

export default () => {
  useEffect(() => {
    const scene = new Scene({
      id: 'map',
      map: new Map({
        center: [121.268, 30.3628],
        zoom: 3,
      }),
    });

    scene.on('loaded', async () => {
      const tiffdata = await getTiffData();
      const tiff = await GeoTIFF.fromArrayBuffer(tiffdata);
      const image = await tiff.getImage();
      const width = image.getWidth();
      const height = image.getHeight();
      const values = await image.readRasters();

      const layer = new RasterLayer();
      layer
        .source(values[0], {
          parser: {
            type: 'raster',
            width,
            height,
            extent: [73.482190241, 3.82501784112, 135.106618732, 57.6300459963],
          },
        })
        .style({
          opacity: 1,
          clampLow: false,
          clampHigh: false,
          domain: [0, 10000],
          rampColors: {
            type:'custom',
            colors: ['#b2182b','#d6604d','#f4a582','#fddbc7','#f7f7f7','#d1e5f0','#92c5de','#4393c3','#2166ac'],
            positions: [0, 50, 200, 500, 2000, 3000, 4000, 5000, 8000,10000],
          },
        });

      scene.addLayer(layer);
    });
  }, []);
  return (
    <div
      id="map"
      style={{
        height: '60vh',
        position: 'relative',
      }}
    />
  );
};
