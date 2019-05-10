export function processData(rawdata) {
	const data = rawdata.reduce(
		(accu, curr) => {
			const pickupHour = new Date(curr.pickup_datetime).getUTCHours();
			const dropoffHour = new Date(curr.dropoff_datetime).getUTCHours();

			const pickupLongitude = Number(curr.pickup_longitude);
			const pickupLatitude = Number(curr.pickup_latitude);

			if (!isNaN(pickupLongitude) && !isNaN(pickupLatitude)) {
				accu.points.push({
					position: [ pickupLongitude, pickupLatitude ],
					hour: pickupHour,
					pickup: true
				});
			}

			const dropoffLongitude = Number(curr.dropoff_longitude);
			const dropoffLatitude = Number(curr.dropoff_latitude);

			if (!isNaN(dropoffLongitude) && !isNaN(dropoffLatitude)) {
				accu.points.push({
					position: [ dropoffLongitude, dropoffLatitude ],
					hour: dropoffHour,
					pickup: false
				});
			}

			const prevPickups = accu.pickupObj[pickupHour] || 0;
			const prevDropoffs = accu.dropoffObj[dropoffHour] || 0;

			accu.pickupObj[pickupHour] = prevPickups + 1;
			accu.dropoffObj[dropoffHour] = prevDropoffs + 1;

			return accu;
		},
		{
			points: [],
			pickupObj: {},
			dropoffObj: {}
		}
	);

	data.pickups = Object.entries(data.pickupObj).map(([ hour, count ]) => {
		return { hour: Number(hour), x: Number(hour) + 0.5, y: count };
	});
	data.dropoffs = Object.entries(data.dropoffObj).map(([ hour, count ]) => {
		return { hour: Number(hour), x: Number(hour) + 0.5, y: count };
	});
	data.selectedHour = null;
	return data;
}
