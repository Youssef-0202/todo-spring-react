CODE_CHANGES = getGitChanges()
def gv = null
pipeline {
    agent any
    parameters{
        string(name: 'VERSION', defaultValue: '1.2.0', description: 'Version to release')
        choice(name: 'ENV', choices: ['dev', 'prod'], description: 'Environment to deploy to')
        booleanParam(name:'executeTests',defaultValue: true,description: 'Execute tests')
    }
    environment{
        NEW_VERSION = '1.2.0'
        SERVER_CREDENTIALS = credentials('')
    }
    tools{
        maven 'maven-3.9'
        gradle 'gradle'
        jdk 'jdk'
    }
    stages{
        stage("init"){
            steps{
                script{
                    gv = load 'script.groovy'
                }
            }
        }
        stage("build"){
            when {
                expression { 
                   params.executeTests
                }
            }
            steps{
               script{
                gv.buildApp()
               }
            }
        }
        stage("test"){
            when {
                expression { 
                    env.BRANCH_NAME == 'dev'
                }
            }
            steps{
                script{
                    gv.testApp()
                } 
            }
        }
        stage("deploy"){

            steps{
                script{
                    env.environment = input(
                        message: "select environment to deploy to :",
                        ok: "Deploy",
                        parameters: [choice(name: 'One', choices: ['dev', 'prod'], description: 'Environment to deploy to')]
                    )
                }

                echo 'deploying ...'
                echo "deploying to : ${ENV}"
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


// a complete piline jenkins -------------------------------------------

