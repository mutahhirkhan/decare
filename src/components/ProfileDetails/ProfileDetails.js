import React, { useState } from 'react'
import { Form, Col, Row, Container, Image } from 'react-bootstrap';
import { Formik, Field } from "formik";
import { uploadProfilePic, deleteProfilePic } from '../../services/firebase/storageService';
import { LoadingButton } from '../LoadingButton/LoadingButton';
import { addUser, getUserByAddress, getUserByEmail } from '../../services/firebase/databaseService';
import { useStore } from '../../context/GlobalState';
import { setUserDetails } from '../../store/actions/userActions';

export const ProfileDetails = () => {
    const [{ user }, dispatch] = useStore();

    const [file, setFile] = useState(null);

    const selectFileHandler = e => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            // console.log(URL.creatObjectURL(e.target.files[0]));
        }
    }

    return (
        <React.Fragment>
            <Container >
                <Row className="justify-content-center">
                    <Col xs='auto' className='mt-5'>
                        <Image src=
                            {
                                file ? URL.createObjectURL(file) :
                                    user.imgUrl ?
                                        user.imgUrl
                                        : "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
                            }
                            roundedCircle
                            height='200px'
                            width='200px' />
                    </Col>
                </Row>

            </Container>
            <Formik
                initialValues={{
                    name: user.name,
                    organizationName: user.organizationName,
                    bio: user.bio
                }}
                onSubmit={async (data, { setSubmitting }) => {
                    setSubmitting(true);
                    let imgUrl = null;
                    if (file) {

                        //upload new profile pic (previous file will be overridden)
                        imgUrl = await uploadProfilePic(file, user.address);
                    }
                    //addUser can also update user because it just overrides the data
                    await addUser(user.address,
                        {
                            ...user,
                            name: data.name,
                            organizationName: data.organizationName,
                            bio: data.bio,
                            imgUrl: imgUrl ? imgUrl : user.imgUrl ? user.imgUrl : ''
                        });

                    const userInfo = await getUserByEmail(user.email);
                    dispatch(setUserDetails(userInfo));

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
                                <Col xs='auto' className='mx-auto mt-2 mb-5'>
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

                            {/* Account Address */}
                            <Form.Group as={Row} controlId="account">
                                <Form.Label column sm="2">Account Address</Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" disabled placeholder={user.address} />
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
