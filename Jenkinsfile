CODE_CHANGES = getGitChanges()
pipeline {
    agent any
    parameters{
        string(name: 'VERSION', defaultValue: '1.2.0', description: 'Version to release')
        choice(name: 'ENV', choices: ['dev', 'prod'], description: 'Environment to deploy to')
        booleanParam(name:'executeTests',defaultValue: true,description: 'Execute tests')
    }
    environment{
        NEW_VERSION = '1.2.0'
        SERVER_CREDENTIALS = creadetials('')
    }
    tools{
        maven 'maven-3.9'
        gradle 'gradle'
        jdk 'jdk'
    }
    stages{
        stage("build"){
            when {
                expression { 
                   params.executeTests
                }
            }
            steps{
                echo 'building ...'
                echo "building version: ${NEW_VERSION}"
            }
        }
        stage("test"){
            when {
                expression { 
                    env.BRANCH_NAME == 'dev'
                }
            }
            steps{
                echo 'testing ...'  
            }
        }
        stage("deploy"){
            steps{
                echo 'deploying ...'
                echo "deploying version : ${params.VERSION}"
                withCredentials([usernamePassword(credentialsId: 'SERVER_CREDENTIALS', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh "ssh some scripts ${USERNAME} ${PASSWORD}"
                }
            }
        }
    }
   post {
        always {
            echo 'always'
        }
        success {
            echo 'success'
        }
        failure {
            echo 'failure'
        }
    }
}
