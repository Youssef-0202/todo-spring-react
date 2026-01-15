// Global variable to hold the loaded groovy script
def gv = null

pipeline {
    agent any

    parameters {
        string(name: 'VERSION', defaultValue: '1.0.0', description: 'Version of the application to build/deploy')
        choice(name: 'ENV', choices: ['dev', 'staging', 'prod'], description: 'Target environment for deployment')
        booleanParam(name: 'SKIP_TESTS', defaultValue: false, description: 'Skip the test execution phase')
    }

    environment {
        // Example of setting a global environment variable
        APP_NAME = 'todo-spring-react'
        // Credentials ID defined in Jenkins Global Credentials
        SERVER_CREDS_ID = 'server-ssh-credentials' 
    }

    tools {
        // These names must match the names configured in Jenkins "Global Tool Configuration"
        maven 'maven-3.9'
        jdk 'jdk-21'
    }

    stages {
        stage("Initialization") {
            steps {
                script {
                    echo "Initializing build for ${env.APP_NAME} version ${params.VERSION}..."
                    // Loading external shared logic
                    gv = load 'script.groovy'
                }
            }
        }

        stage("Build") {
            steps {
                script {
                    echo "Building the application..."
                    // Using the external script method
                    gv.buildApp()
                    // Actual Maven command to package the Spring Boot app
                    sh "mvn clean package -DskipTests"
                }
            }
        }

        stage("Test") {
            when {
                expression { !params.SKIP_TESTS }
            }
            steps {
                script {
                    echo "Running Unit and Integration Tests..."
                    gv.testApp()
                    // Actual Maven command to run tests
                    sh "mvn test"
                }
            }
            post {
                always {
                    // Archive test results in Jenkins
                    junit '**/target/surefire-reports/*.xml'
                }
            }
        }

        stage("Deploy") {
            // Manual approval step for production deployment
            when {
                expression { params.ENV == 'prod' }
            }
            steps {
                input message: "Approve deployment to PRODUCTION?", ok: "Deploy Now"
                
                script {
                    echo "Deploying version ${params.VERSION} to ${params.ENV}..."
                    
                    // Securely using credentials for SSH deployment
                    // Note: 'server-ssh-credentials' must exist in Jenkins
                    /* 
                    withCredentials([usernamePassword(credentialsId: env.SERVER_CREDS_ID, usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                        sh "sshpass -p '$PASS' ssh -o StrictHostKeyChecking=no $USER@your-server-ip 'deploy-script.sh ${params.VERSION}'"
                    }
                    */
                    echo "Deployment successful!"
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finished. Cleaning up workspace..."
            cleanWs()
        }
        success {
            echo "Build and Deployment completed successfully!"
        }
        failure {
            echo "Pipeline failed. Please check the logs."
        }
    }
}
