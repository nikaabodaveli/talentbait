import React from 'react'

class JobPost extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			showPopup: false
		}
	}

	//show createView afte edit button click
	handleEdit() {
		return this.props.toggleCreateView(true)
	}

	//popup functions
	showPopup() {
		this.setState({
			showPopup: true
		})
	}

	hidePopup() {
		this.setState({
			showPopup: false
		})
	}

	renderPopup() {
		if (!this.state.showPopup) {
			return null
		}

		return (
			<div className="popup">
				<div className="dialog">
					<div className="msg">Are you sure you want to delete this job?</div>
					<div className="btns">
						<button className="editBtn" onClick={() => this.hidePopup()}>Cancel</button>
						<button className="deleteBtn" onClick={() => this.props.deleteJob()}>Delete</button>
					</div>
				</div>
			</div>
		)
	}

	render() {
		const job = this.props.job

		//in case requirments is just a string, make it array
		if(!Array.isArray(job.requirements)) {
			job.requirements = [job.requirements]
		}

		const requirements = job.requirements.map((elem, index) => 
			<li key={index}>{elem}</li>
		)

		const tasks = job.tasks.map((elem, index) =>
			<li key={index}>{elem}</li>
		)

		return (
			<div>
				<div className="JobPost">
					<div className="title">{job.title}</div>
					<div className="city">City: {job.city}</div>
					<div className="employer">Company: {job.employer}</div>
					<div><b>Requirements</b></div>
					<ul className="requirments">{requirements}</ul> 
					<div><b>Tasks</b></div>
					<ul className="tasks">{tasks}</ul>
				</div>
				<div>
					<button className="editBtn" onClick={() => this.handleEdit()}>Edit</button>
					<button className="deleteBtn" onClick={() => this.showPopup()}>Delete</button>
					<button className="backBtn" onClick={() => this.props.backToIndex()}>Back</button>
				</div>
				{this.renderPopup()}	
			</div>
		)
	}
}

export default JobPost