import React from 'react';
import { mapStylePicker } from './style';

const MAPBOX_DEFAULT_MAPSTYLES = [
	{ label: 'Streets V10', value: 'mapbox://styles/mapbox/streets-v10' },
	{ label: 'Outdoors V10', value: 'mapbox://styles/mapbox/outdoors-v10' },
	{ label: 'Light V9', value: 'mapbox://styles/mapbox/light-v9' },
	{ label: 'Dark V9', value: 'mapbox://styles/mapbox/dark-v9' },
	{ label: 'Satellite V9', value: 'mapbox://styles/mapbox/satellite-v9' },
	{
		label: 'Satellite Streets V10',
		value: 'mapbox://styles/mapbox/satellite-streets-v10'
	},
	{
		label: 'Navigation Preview Day V4',
		value: 'mapbox://styles/mapbox/navigation-preview-day-v4'
	},
	{
		label: 'Navitation Preview Night V4',
		value: 'mapbox://styles/mapbox/navigation-preview-night-v4'
	},
	{
		label: 'Navigation Guidance Day V4',
		value: 'mapbox://styles/mapbox/navigation-guidance-day-v4'
	},
	{
		label: 'Navigation Guidance Night V4',
		value: 'mapbox://styles/mapbox/navigation-guidance-night-v4'
	}
];

export const MapStylePicker = ({ currentStyle, onStyleChange }) => {
	return (
		<div>
			<select
				className="map-style-picker"
				style={mapStylePicker}
				value={currentStyle}
				onChange={(e) => onStyleChange(e.target.value)}
			>
				{MAPBOX_DEFAULT_MAPSTYLES.map((style) => (
					<option key={style.value} value={style.value}>
						{style.label}
					</option>
				))}
			</select>
		</div>
	);
};
