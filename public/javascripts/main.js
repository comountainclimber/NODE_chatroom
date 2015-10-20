angular.module('ChatApp', [])

angular.module('ChatApp')
	.controller('mainController', ['$scope', '$http', function($scope, $http){

		$scope.messages = []

		socket.on('message', function(data){
			console.log(data)
			$scope.$apply(function(){$scope.messages.push(data)})
		})

		socket.on('user', function(user){
			console.log(user)
			$scope.allUsers = user
			$scope.$apply(function(){$scope.allUsers})
		})

		$scope.chatMessage = function(){
			console.log($scope.chatData)
			socket.emit('message', $scope.chatData.message)
			$scope.chatData = {}
		}

		$scope.hideTheChat = true
		$scope.hideUserNameInput = false

		$scope.usernameSubmit = function(){
			$scope.hideTheChat = false
			$scope.hideUserNameInput = true
			console.log($scope.user.name)
			socket.emit('username', $scope.user.name)
			$scope.user = {}
		}
	}])