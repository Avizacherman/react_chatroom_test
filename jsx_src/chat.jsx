var ChatRoom = React.createClass({
	getInitialState: function(){
		return  {data: []}
	}, 
	componentDidMount: function () {
	  this.loadChatFromServer()
	  setInterval(this.loadChatFromServer, this.prop.interval)
	},
	loadChatFromServer: function(){
		$.get(this.props.url).done(function(data){

			this.setState({data: data})

		}.bind(this))
	},
	chatSubmit: function(chatData){
		var chatter = this.state.data
		var newChatter = chatter.concat([chatData])
		
		this.setState({data: chatData})

		$.ajax({
			url: this.props.url,
			data: chatData,
			dataType: 'json',
			type: 'POST'
			}
			).done(function(data){
			this.setState({data: data})
		}.bind(this))
	},
	render: function() {
		
		return (
			<div className="chatRoom">
				<h1> Super Fantastic Chatroom </h1>
				<ChatDisplay data={this.state.data} />
				<ChatForm chatSubmit={this.chatSubmit}/>
			</div>
			)
	}
})

var ChatLine = React.createClass({
	
	render: function(){
		return(
			<div className="chatLine">
				<span className="chatUser" style={{color: this.props.color}}> {this.props.user}  </span>:  
				<span className="chatMessage"> {this.props.message}</span>
			</div>
			)
	}
})

var ChatDisplay = React.createClass({
	render: function(){
		
		var display = this.props.data.map(function(line){
			
			return (

				<ChatLine user={line.user} message={line.message} color={line.color} /> 
				)
		})
		return (
			<div className="chatDisplay"> {display} </div>
			)
	}
})

var ChatForm = React.createClass({
	submission: function(event){
		event.preventDefault()
		var userName = React.findDOMNode(this.refs.user).value.trim()
		var message = React.findDOMNode(this.refs.message).value.trim()
		var color = React.findDOMNode(this.refs.color).value.trim()
		
		this.props.chatSubmit({user: userName, message: message, color: color})
		userName = React.findDOMNode(this.refs.user).value = ""
		message = React.findDOMNode(this.refs.message).value = ""
	}, 
	render: function(){
		return(
			<form className="chatForm" onSubmit={this.submission}>
				<input className="user" placeholder="Enter user name" ref="user" />
				<input className="message" placeholder="Enter a message" ref="message" />
				Select a color
				<select className="color" ref="color"> 
					<option value="red"> Red </option>
					<option value="blue"> Blue </option>
					<option value="green"> Green </option>
					<option value="orange"> Orange </option>
					<option value="black"> Black </option>

				</select>
				<input type="submit" value="Post" />
			</form>
			)
	}
})

React.render(
	<ChatRoom url="/chatroom/" interval={2000}/>,
  document.getElementById('content')
	)