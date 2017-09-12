pipeline {
  agent any
  stages {
    stage('b1') {
      steps {
        parallel(
          "b1": {
            sh 'ls'
            
          },
          "b2": {
            echo 'hey'
            
          }
        )
      }
    }
    stage('p3') {
      steps {
        echo 'p3'
      }
    }
  }
}