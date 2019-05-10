import React from 'react'
import { Checkbox, Row, Col } from 'antd';

const ConditionsList = () => (
    <Checkbox.Group style={{ width: '100%' }}>
        <Row>
            <Col span={4}><Checkbox value="harness wound">harness wound</Checkbox></Col>
            <Col span={4}><Checkbox value="saddle wound">saddle wound</Checkbox></Col>
            <Col span={4}><Checkbox value="hobbles wound">hobbles wound</Checkbox></Col>
            <Col span={4}><Checkbox value="hoof problem">hoof problem</Checkbox></Col>
            <Col span={4}><Checkbox value="hip dislocation">hip dislocation</Checkbox></Col>
            <Col span={4}><Checkbox value="leg lameness">leg lameness</Checkbox></Col>
            <Col span={4}><Checkbox value="eye problem">eye problem</Checkbox></Col>
            <Col span={4}><Checkbox value="mixed infection">mixed infection</Checkbox></Col>
            <Col span={4}><Checkbox value="pyrexia">pyrexia</Checkbox></Col>
            <Col span={4}><Checkbox value="anaemic condition">anaemic condition</Checkbox></Col>
            <Col span={4}><Checkbox value="mineral deficiency">mineral deficiency</Checkbox></Col>
            <Col span={4}><Checkbox value="an urea condition">an urea condition</Checkbox></Col>
            <Col span={4}><Checkbox value="diarrhoea">diarrhoea</Checkbox></Col>
            <Col span={4}><Checkbox value="colic">colic</Checkbox></Col>
            <Col span={4}><Checkbox value="respiratory">respiratory</Checkbox></Col>
            <Col span={4}><Checkbox value="circling movement">circling movement</Checkbox></Col>
            <Col span={4}><Checkbox value="dystosia condition">dystosia condition</Checkbox></Col>
            <Col span={4}><Checkbox value="dermatitis">dermatitis</Checkbox></Col>
            <Col span={4}><Checkbox value="anal prolapse">anal prolapse</Checkbox></Col>
            <Col span={4}><Checkbox value="tetnus vaccine">tetnus vaccine</Checkbox></Col>
            <Col span={4}><Checkbox value="deworming">deworming</Checkbox></Col>
            <Col span={4}><Checkbox value="emergency">emergency</Checkbox></Col>
            <Col span={4}><Checkbox value="anaplasmosis">anaplasmosis</Checkbox></Col>
            <Col span={4}><Checkbox value="strangle suspicion">strangle suspicion</Checkbox></Col>
            <Col span={4}><Checkbox value="maggot infection">maggot infection</Checkbox></Col>
        </Row>
    </Checkbox.Group>
)

export default ConditionsList;