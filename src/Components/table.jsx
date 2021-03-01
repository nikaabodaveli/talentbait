import React from 'react'

class Table extends React.Component {
	render() {
		const jobs = this.props.jobList.map((elem, index) => 
			<tr key={elem._id}>
				<td onClick={e => this.props.onJobClick(index)}>{elem.title}</td>
				<td>{elem.city}</td>
				<td>{elem.employer}</td>
			</tr>
		)
		return (
			<div className="indexView">
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>City</th>
						<th>Company</th>
					</tr>
				</thead>
				<tbody>
					{jobs}
				</tbody>
			</table>
			<div className="createJob">
				<button className="createBtn" onClick={() => this.props.toggleCreateView(true)}>Create</button>
			</div>
			</div>
		)
	}
}

export default Table;