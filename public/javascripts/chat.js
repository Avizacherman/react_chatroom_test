'use strict';

var ChatRoom = React.createClass({
	displayName: 'ChatRoom',

	getInitialState: function getInitialState() {
		return { data: [] };
	},
	componentDidMount: function componentDidMount() {
		this.loadChatFromServer();
	},
	loadChatFromServer: function loadChatFromServer() {
		$.get(this.props.url).done((function (data) {

			this.setState({ data: data });
		}).bind(this));
	},
	chatSubmit: function chatSubmit(chatData) {
		var chatter = this.state.data;
		var newChatter = chatter.concat([chatData]);

		this.setState({ data: chatData });

		$.ajax({
			url: this.props.url,
			data: chatData,
			dataType: 'json',
			type: 'POST'
		}).done((function (data) {
			this.setState({ data: data });
		}).bind(this));
	},
	render: function render() {

		return React.createElement(
			'div',
			{ className: 'chatRoom' },
			React.createElement(
				'h1',
				null,
				' Super Fantastic Chatroom '
			),
			React.createElement(ChatDisplay, { data: this.state.data }),
			React.createElement(ChatForm, { chatSubmit: this.chatSubmit })
		);
	}
});

var ChatLine = React.createClass({
	displayName: 'ChatLine',

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'chatLine' },
			React.createElement(
				'span',
				{ className: 'chatUser', style: { color: this.props.color } },
				' ',
				this.props.user,
				'  '
			),
			':',
			React.createElement(
				'span',
				{ className: 'chatMessage' },
				' ',
				this.props.message
			)
		);
	}
});

var ChatDisplay = React.createClass({
	displayName: 'ChatDisplay',

	render: function render() {

		var display = this.props.data.map(function (line) {

			return React.createElement(ChatLine, { user: line.user, message: line.message, color: line.color });
		});
		return React.createElement(
			'div',
			{ className: 'chatDisplay' },
			' ',
			display,
			' '
		);
	}
});

var ChatForm = React.createClass({
	displayName: 'ChatForm',

	submission: function submission(event) {
		event.preventDefault();
		var userName = React.findDOMNode(this.refs.user).value.trim();
		var message = React.findDOMNode(this.refs.message).value.trim();
		var color = React.findDOMNode(this.refs.color).value.trim();

		this.props.chatSubmit({ user: userName, message: message, color: color });
		userName = React.findDOMNode(this.refs.user).value = "";
		message = React.findDOMNode(this.refs.message).value = "";
	},
	render: function render() {
		return React.createElement(
			'form',
			{ className: 'chatForm', onSubmit: this.submission },
			React.createElement('input', { className: 'user', placeholder: 'Enter user name', ref: 'user' }),
			React.createElement('input', { className: 'message', placeholder: 'Enter a message', ref: 'message' }),
			'Select a color',
			React.createElement(
				'select',
				{ className: 'color', ref: 'color' },
				React.createElement(
					'option',
					{ value: 'red' },
					' Red '
				),
				React.createElement(
					'option',
					{ value: 'blue' },
					' Blue '
				),
				React.createElement(
					'option',
					{ value: 'green' },
					' Green '
				),
				React.createElement(
					'option',
					{ value: 'orange' },
					' Orange '
				),
				React.createElement(
					'option',
					{ value: 'black' },
					' Black '
				)
			),
			React.createElement('input', { type: 'submit', value: 'Post' })
		);
	}
});

React.render(React.createElement(ChatRoom, { url: '/chatroom/' }), document.getElementById('content'));