angular.module('ChatApp', [])

angular.module('ChatApp')
	.controller('mainController', ['$scope', '$http', function($scope, $http){

		$scope.messages = []
		$scope.disconnectedUsers = []
		

		socket.on('message', function(data){
			console.log(data)
			$scope.$apply(function(){$scope.messages.push(data)})
		})

		socket.on('user', function(user){
			console.log(user)
			$scope.allUsers = user
			$scope.$apply(function(){$scope.allUsers})
		})

			$scope.hasD = false

		socket.on('disconnect', function(user){
			console.log(user, "has left the pizza chat")
			$scope.hasD = true
			$scope.disconnectedUsers.push(user)
			$scope.$apply(function(){$scope.disconnectedUsers})
			
		})

		// socket.on('updatedUsers', function(){
		// 	$scope.$apply(function(){$scope.allUsers})
		// })

		$scope.chatMessage = function(){
			console.log($scope.chatData)
			socket.emit('message', $scope.chatData.message)
			$scope.chatData = {}
		}

		$scope.hideTheChat = true
		$scope.hideUserNameInput = false


		// $scope.displayConnection = false
		$scope.usernameSubmit = function(){
			$scope.hideTheChat = false
			$scope.hideUserNameInput = true
			console.log($scope.user.name)
			// $scope.displayConnection = true
			socket.emit('username', $scope.user.name)
			$scope.user = {}
		}
	}])