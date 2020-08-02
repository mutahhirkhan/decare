import React, { useState } from 'react'
import { Form, Col, Row, Container, Image, Button } from 'react-bootstrap';
import { Formik, Field } from "formik";
import { uploadProfilePic } from '../../firebase/storageService';
import { LoadingButton } from '../LoadingButton/LoadingButton';
import { addUser, getUserByAddress } from '../../firebase/databaseService';
import { useStore } from '../../context/GlobalState';

export const ProfileDetails = () => {
    const [{ user }, dispatch] = useStore();
    const [file, setFile] = useState(null);
    console.logo(user);
    const selectFileHandler = e => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    }

    return (
        <React.Fragment>
            <Container className='justify-content-center'>
                <Row >
                    <Col md='auto' className='mx-auto mt-5'>
                        <Image src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
                            roundedCircle
                            height='200px' />
                    </Col>
                </Row>

            </Container>
            <Formik
                initialValues={{
                    name: '',
                    organizationName: '',
                    bio: ''
                }}
                onSubmit={async (data, { setSubmitting }) => {
                    setSubmitting(true);

                    //upload profile pic
                    // await uploadProfilePic(file);
                    await addUser('0x123',
                        {
                            name: 'test user 1',
                            email: 'test@test.com',
                            bio: 'developer',
                        });

                    const user = await getUserByAddress('0x123');
                    console.log(user);

                    setSubmitting(false);
                }}

                validate={values => {
                    const errors = {};
                    if (values.name.length === 0) {
                        errors.name = 'Name cannot be empty.';
                    }

                    return errors;
                }}
            >
                {
                    ({ handleSubmit, errors, touched, isSubmitting }) => (

                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row} controlid="image">
                                <Col md='auto' className='mx-auto mt-2 mb-5'>
                                    <Form.File
                                        onChange={selectFileHandler}
                                        id="custom-file-translate-scss"
                                        data-browse='Select Image'
                                        label={file ? file.name : ''}
                                        lang="en"
                                        custom
                                    />
                                </Col>
                            </Form.Group>

                            {/* Name */}
                            <Form.Group as={Row} controlId="name">
                                <Form.Label column sm="2">Name</Form.Label>
                                <Col sm="10">
                                    <Field as={Form.Control} type="text" name='name' isInvalid={touched.name && !!errors.name} />
                                    <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            {/* Organization Name */}
                            <Form.Group as={Row} controlId="organizationName">
                                <Form.Label column sm="2">Organization Name</Form.Label>
                                <Col sm="10">
                                    <Field as={Form.Control} type="text" name='organizationName' isInvalid={touched.organizationName && !!errors.organizationName} />
                                    <Form.Control.Feedback type='invalid'>{errors.organizationName}</Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            {/* Bio */}
                            <Form.Group as={Row} controlId="bio">
                                <Form.Label column sm="2">Bio</Form.Label>
                                <Col sm="10">
                                    <Field as={Form.Control} type="text" name='bio' isInvalid={touched.bio && !!errors.bio} />
                                    <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            {/* Email */}
                            <Form.Group as={Row} controlId="email">
                                <Form.Label column sm="2">Email</Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" disabled placeholder={user.email} />
                                </Col>
                            </Form.Group>

                            {/* Save */}
                            <Row className='justify-content-end align-items-end my-4'>
                                <Col md='auto'>
                                    <LoadingButton type='submit'
                                        className='px-5'
                                        isloading={isSubmitting}>Save</LoadingButton>
                                </Col>
                            </Row>


                        </Form>)
                }
            </Formik>
        </React.Fragment >
    );
}
