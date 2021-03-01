import React from 'react'
import jobList from './jobList'
import Table from './Components/table.jsx'
import JobPost from './Components/readView.jsx'
import JobForm from './Components/createView.jsx'

import './App.css'

class App extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			jobList: jobList,
			postIndex: -1,
			showCreate: false,
			confirmChanges: false,
			confirmDelete: false
		}
		this.onJobClick = this.onJobClick.bind(this)
		this.addJob = this.addJob.bind(this)
		this.saveChanges = this.saveChanges.bind(this)
		this.toggleCreateView = this.toggleCreateView.bind(this)
		this.deleteJob = this.deleteJob.bind(this)
		this.backToIndex = this.backToIndex.bind(this)
		this.renderConfirmChanges = this.renderConfirmChanges.bind(this)
	}

	//set job index in state after clicking on title
	onJobClick(index) {
		this.setState({
			postIndex: index
		})
	}

	//add new job object to jobList, go back to index view 
	addJob(elem) {
		this.setState({
			jobList: [...this.state.jobList, elem],
			postIndex: -1,
			showCreate: false
		})
	}

	//save edited job Obj and notify user
	saveChanges(elem, index) {
		var newJobList = [...this.state.jobList]
		newJobList[index] = elem
		this.setState({
			jobList: newJobList,
			showCreate: false,
			confirmChanges: true
		})

		setTimeout(() => {
      		this.setState({
      			confirmChanges: false
      		})
   		 }, 3000)

		return this.renderConfirmChanges()
	}

	//render notification
	renderConfirmChanges() {
		if(!this.state.confirmChanges) {
			return null
		}

		return (
			<div className="saveChangesNoti">
				Changes saved succesfully!
			</div>
		)
	}

	toggleCreateView(condition) {
		this.setState({
			showCreate: condition
		})
	}

	//delete job Obj from jobList array, go back to index view
	//and return notification function
	deleteJob() {
		var newJobList = [...this.state.jobList]
		newJobList.splice(this.state.postIndex, 1)
		this.setState({
			jobList: newJobList,
			postIndex: -1,
			confirmDelete: true
		})

		setTimeout(() => {
      		this.setState({
      			confirmDelete: false
      		})
   		}, 3000)

   		return this.renderConfirmDelete()
	}

	//render succesful delete notification
	renderConfirmDelete() {
		if(!this.state.confirmDelete) {
			return null
		}

		return (
			<div className="deleteNoti">
				Job deleted succesfully!
			</div>
		)
	}

	//from readView to indexView
	backToIndex() {
		return this.setState({
			postIndex: -1
		})
	}

	//render index view
	renderTable() {
		return (
			<Table 
				jobList={this.state.jobList}
				onJobClick={this.onJobClick}
				toggleCreateView={this.toggleCreateView}
			/>
		)
	}

	renderCreateView() {
		return (
			<JobForm 
				addJob={this.addJob}
				postIndex={this.state.postIndex}
				jobList={this.state.jobList}
				saveChanges={this.saveChanges}
				toggleCreateView={this.toggleCreateView}
			/>
		)
	}

	render() {
		if (this.state.showCreate) {
			return this.renderCreateView()
		}

		if (this.state.postIndex < 0) {
			return (
				<div>
					<div>
						{this.renderTable()}
					</div>
					<div>
						{this.renderConfirmDelete()}
					</div>
				</div>
			)
		}

		return (
			<div>
				<JobPost
					job={this.state.jobList[this.state.postIndex]}
					toggleCreateView={this.toggleCreateView}
					jobList={this.state.jobList}
					index={this.state.postIndex}
					deleteJob={this.deleteJob}
					backToIndex={this.backToIndex}
				/>
				<div>
					{this.renderConfirmChanges()}
				</div>
			</div>
		)
	}
}

export default App;