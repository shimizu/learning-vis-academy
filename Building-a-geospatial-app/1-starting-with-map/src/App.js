import React, { useEffect, useState } from 'react';
import MapGL from 'react-map-gl';

import { MapStylePicker } from './controls';

const MAPBOX_TOKEN = '';

export default () => {
	const [ mapboxStyle, setMapStyle ] = useState('mapbox://styles/mapbox/light-v9');

	const [ viewport, setViewport ] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
		longitude: -74,
		latitude: 40.7,
		zoom: 11,
		maxZoom: 16
	});

	//resize
	useEffect(() => {
		const handleResize = () => {
			setViewport((v) => {
				return {
					...v,
					width: window.innerWidth,
					height: window.innerHeight
				};
			});
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div>
			<MapStylePicker currentStyle={mapboxStyle} onStyleChange={setMapStyle} />
			<MapGL
				{...viewport}
				mapStyle={mapboxStyle}
				mapboxApiAccessToken={MAPBOX_TOKEN}
				onViewportChange={(v) => setViewport(v)}
			/>
		</div>
	);
};
