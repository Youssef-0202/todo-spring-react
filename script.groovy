def buildApp(){
    echo 'building ...'
    echo "building version: ${params.VERSION}"
}

def testApp(){
    echo 'testing ...'
    echo "testing version: ${params.VERSION}"
}

return this
