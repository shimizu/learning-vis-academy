import React, { useEffect, useState } from 'react';
import MapGL from 'react-map-gl';
import DeckGL from 'deck.gl';
import { renderLayers } from './deckgl-layers';
import { processData } from './processdata.js';

import { LayerControls, MapStylePicker, HEXAGON_CONTROLS } from './controls';
import { tooltipStyle } from './style';
import taxiData from './taxi.js';

import Charts from './charts';

const MAPBOX_TOKEN = '';

export default () => {
	const [ mapboxStyle, setMapStyle ] = useState('mapbox://styles/mapbox/light-v9');

	const [ data, setData ] = useState(processData(taxiData));

	const [ layerSettings, setLayerSetting ] = useState(
		Object.keys(HEXAGON_CONTROLS).reduce(
			(accu, key) => ({
				...accu,
				[key]: HEXAGON_CONTROLS[key].value
			}),
			{}
		)
	);

	const [ viewport, setViewport ] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
		longitude: -74,
		latitude: 40.7,
		zoom: 12,
		maxZoom: 16,
		pitch: 45,
		bearing: 0
	});

	const [ hover, setHover ] = useState({
		x: 0,
		y: 0,
		hoveredObject: null,
		label: null
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
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const onHover = ({ x, y, object }) => {
		const label = object ? (object.pickup ? 'Pickup' : 'Dropoff') : null;
		setHover({ x, y, hoveredObject: object, label });
	};

	const onHighlight = (highlightedHour) => {
		setData((d) => {
			return { ...d, highlightedHour };
		});
	};

	const onSelect = (selectedHour) => {
		setData((d) => {
			if (selectedHour === d.selectedHour) selectedHour = null;
			return { ...d, selectedHour };
		});
	};

	const onSetting = (newSetting) => {
		console.log(newSetting);
		setLayerSetting(newSetting);
	};

	return (
		<div>
			{hover.hoveredObject && (
				<div
					style={{
						...tooltipStyle,
						transform: `translate(${hover.x}px, ${hover.y}px)`
					}}
				>
					<div>{hover.label}}</div>
				</div>
			)}
			<MapStylePicker currentStyle={mapboxStyle} onStyleChange={setMapStyle} />
			<LayerControls settings={layerSettings} propTypes={HEXAGON_CONTROLS} onChange={setLayerSetting} />
			<MapGL
				{...viewport}
				mapStyle={mapboxStyle}
				mapboxApiAccessToken={MAPBOX_TOKEN}
				onViewportChange={(v) => setViewport(v)} // <-second callback argument errorが出るので
			>
				<DeckGL
					layers={renderLayers({
						data: data.points,
						hour: data.selectedHour,
						settings: layerSettings,
						onHover: onHover
					})}
					viewState={viewport}
					onViewportChange={setViewport}
				/>
				<Charts {...data} highlight={onHighlight} select={onSelect} />
			</MapGL>
		</div>
	);
};
