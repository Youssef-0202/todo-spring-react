pipline {
    agent any 
    tools{
        maven 'maven-3.9'
    }
    satges {
        stage("test mvn"){
            script{
            echo "Testing MVN ..."
            }
        }           
        stage("build image "){
            steps{
                script{
                    "docker build -t youssefaitbahssine23013/jenkins-todo-app:jma-1.2 ."
                }
            }
        }
        stage("deploy"){
            steps{
                script{
                    echo "Deploying image ..."
                    withCredentials([usernamePassword   (credentialsId:'docker-hub-repo',passwordVariable:'PASS',  usernameVariable:'USER')]){
                    sh "echo $PASS | docker login -u $USER --password-stdn" 
                    sh "docker push  youssefaitbahssine23013/jenkins-todo-app:jma-1.2  "
                    }
                }
            }
        }   
    }    
}
