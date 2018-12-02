import React from 'react';
import PropTpyes from 'prop-types';

const track_Course = {
	CSE: {
		title: "Computational Science and Engineering Track",
		req: ["CS31400"],
		elec: ["CS30700", "CS33400", "CS35200", "CS35400", "CS38100", "CS43400", "CS34800", "CS44800",
			"CS45600", "CS47100", "CS48300", "CS49000", "CS49700", "CS51400", "CS51500"
		],
	},
	CGV: {
		title: "Computer Graphics and Visualization Track",
		req: ["CS33400", "CS31400", "CS38100"],
		elec: ["CS31400", "CS35200", "CS35400", "CS38100", "CS42200", "CS43400", "CS44800", "CS47100", "CS49000"],
	},
	DIS: {
		title: "Database and Information Systems Track",
		req: ["CS34800", "CS38100", "CS44800", "CS37300", "CS47300"],
		elec: ["CS35200", "CS35400", "CS35500", "CS42600", "CS42200", "CS47100", "CS47800", "CS49700"],
	},
	CS: {
		title: "Foundations of Computer Science Track",
		req: ["CS35200", "CS38100"],
		elec: ["CS31400", "CS33400", "CS35500", "CS44800", "CS45600", "CS47100", "CS48300"],
	},
	MI: {
		title: "Machine Intelligence Track",
		req: ["CS37300", "CS38100", "CS47100", "CS47300", "STAT41600", "MA41600", "STAT51200"],
		elec: ["CS34800", "CS35200", "CS44800", "CS45600", "CS48300"],
	},
	Security: {
		title: "Security Track",
		req: ["CS35400", "CS35500", "CS42600"],
		elec: ["CS30700", "CS34800", "CS35200", "CS35300", "CS37300", "CS38100", "CS40800", "CS42200", "CS44800", "CS45600", "CS48900", "CS49000-DS0", "CS49000-SWS"],
	},
	SWE: {
		title: "Software Engineering Track",
		req: ["CS30700", "CS35200", "CS35400", "CS40800", "CS40700"],
		elec: ["CS34800", "CS35300", "CS37300", "CS38100", "CS42200", "CS42600", "CS44800", "CS45600", "CS47300",
			"CS49000-DSO", "CS48900", "CS39000-VRA", "CS39000-WAP", "CS49000-SWS"
		],
	},
}

const CheckboxOrRadioGroup = (props) => (
	<div>
		<label className="form-label">{props.title}</label>
		<div className="checkbox-group">
			{/* {props.options.map(option => { */}
			{track_Course[props.title].req.map(option => {
				return (
					<label key={option} className="form-label capitalize">
						<input
							className="form-checkbox"
							name={props.setName}
							onChange={props.controlFunc}
							value={option}
							checked={props.selectedOptions.indexOf(option) > -1}
							type={props.type} /> {option}
					</label>
				);
			})}
		</div>
	</div>
);

CheckboxOrRadioGroup.propTypes = {
	title: PropTpyes.string.isRequired,
	type: PropTpyes.oneOf(['checkbox', 'radio']).isRequired,
	setName: PropTpyes.string.isRequired,
	options: PropTpyes.array.isRequired,
	selectedOptions: PropTpyes.array,
	controlFunc: PropTpyes.func.isRequired
};

export default CheckboxOrRadioGroup;