pipeline {
    agent any 
    tools{
        maven 'maven-3.9'
    }
    stages {
        stage("test mvn"){
            steps {
                script{
                    echo "Testing MVN ..."
                }
            }
        }
        stage("build mvn"){
            steps{
               script{
                echo "incrementing version :"
                sh "mvn build-helper:parse-version versions:set -DnewVersion=\\\${parsedVersion.majorVersion}.\\\${parsedVersion.minorVersion}.\\\${parsedVersion.nextIncrementalVersion}-SNAPSHOT versions:commit "

                def matcher = readFile('pom.xml') =~ '<version>(.+)</version>'
                def version = matcher[0][1]
                IMAGE_NAME = "$version-$BUILDER_NUMBER" // just a template to versioning our images
                
                echo "Start building mvn"
                sh "mvn clean package -DskipTests"
               }
            }
        }          
        stage("build image "){
            steps{
                script{
                    sh "docker build -t youssefaitbahssine23013/jenkins-todo-app:$IMAGE_NAME ."
                }
            }
        }
        stage("deploy"){
            steps{
                script{
                    echo "Deploying image ..."
                    withCredentials([usernamePassword   (credentialsId:'docker-hub-repo',passwordVariable:'PASS',  usernameVariable:'USER')]){
                    sh "echo $PASS | docker login -u $USER --password-stdin" 
                    sh "docker push  youssefaitbahssine23013/jenkins-todo-app:$IMAGE_NAME  "
                    }
                }
            }
        }   
    }    
}
