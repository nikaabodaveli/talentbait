import React from 'react'

class JobForm extends React.Component {
	constructor(props) {
		super(props)

		const job = this.props.postIndex === -1 ? {} : this.props.jobList[this.props.postIndex]

		//this.state is ...job if editing
		//and empty/examples if creating
		this.state = {
			title: "Example",
			city: "Example",
			employer: "Example",
			requirements: ["Example", "Example", "Example"],
			tasks: ["Example", "Example", "Example"],
			_id: null,
			...job,
		}

		this.onChangeRequire = this.onChangeRequire.bind(this)
		this.onChangeTask = this.onChangeTask.bind(this)
		this.addRequirement = this.addRequirement.bind(this)
		this.addTask = this.addTask.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleCancel = this.handleCancel.bind(this)
	}

	//handle requirments input
	onChangeRequire(e, index) {
		const requirements = [...this.state.requirements]
		requirements[index] = e.target.value
		this.setState({
			requirements: requirements
		})
	}

	//handle tasks input
	onChangeTask(e, index) {
		const tasks = [...this.state.tasks]
		tasks[index] = e.target.value
		this.setState({
			tasks: tasks
		})
	}

	//handle deleting requirement
	onDeleteRequire(e, index) {
		const requirements = [...this.state.requirements]
		requirements.splice(index, 1)

		this.setState({
			requirements: requirements
		})
	}

	//handle deleting task
	onDeleteTask(e, index) {
		const tasks = [...this.state.tasks]
		tasks.splice(index, 1)

		this.setState({
			tasks: tasks
		})
	}

	//handle requirement/task addition
	addRequirement() {
		var requirements = [...this.state.requirements]
		requirements = requirements.concat("")
		this.setState({
			requirements: requirements
		})
	}

	addTask() {
		var tasks = [...this.state.tasks]
		tasks = tasks.concat("")
		this.setState({
			tasks: tasks
		})
	}

	//push new job Obj in array if creating, 
	//save changes if editing on Add/Save Btn click
	handleSubmit() {
		if (this.props.postIndex < 0) {
			return this.props.addJob({
				...this.state,
				_id: Date.now()
			})
		}

		this.props.saveChanges({...this.state}, this.props.postIndex)
	}

	handleCancel() {
		return this.props.toggleCreateView(false)
	}

 	render() {
 		//requirements and tasks arrays
 		const reqInput = this.state.requirements.map((elem, index) => 
			<div className="deletable-input" key={index}>
				<input onChange={e => this.onChangeRequire(e, index)} value={elem} />
				<button onClick={e => this.onDeleteRequire(e, index)}>-</button>
			</div>
		)

 		const taskInput = this.state.tasks.map((elem, index) => 
			<div className="deletable-input" key={index}>
				<input onChange={e => this.onChangeTask(e, index)} value={elem} />
				<button onClick={e => this.onDeleteTask(e, index)}>-</button>
			</div>
		)

 		//save if editing, add if creating
 		var addSave = this.props.postIndex > 0 ? "Save" : "Add"

		return (
			<div className="createView">
				<div className="jobInfo">
					<div>
						<label>Job Title:</label>
						<input
							className="titleInput"
							value={this.state.title}
							onChange={e => this.setState({ title: e.target.value })}
						/>
					</div>
					<div>
						<label>Location:</label>
						<input
							className="cityInput"
							value={this.state.city}
							onChange={e => this.setState({ city: e.target.value })}
						/>
					</div>
					<div>
						<label>Employer:</label>
						<input
							className="employerInput"
							value={this.state.employer}
							onChange={e => this.setState({ employer: e.target.value })}
						/>
					</div>
					<div className="inputList">
						<label>Requirement:</label>
						{reqInput}
						<button className="addRequirement" onClick={() => this.addRequirement()}>+</button>
					</div>
					<div className="inputList">
						<label>Task:</label>
						{taskInput}
						<button className="addTask" onClick={() => this.addTask()}>+</button>
					</div>
				</div>
				<div className="btns">
					<button className="addJob" onClick={() => this.handleSubmit()}>{addSave}</button>
					<button className="cancel" onClick={() => this.handleCancel()}>Cancel</button>
				</div>
			</div>
		)
	}
}

export default JobForm