import React, { memo } from "react";
import Container from "../../ui/container";

const CheckEmail: React.FC = () => {
  return(
    <main>
      <Container>
        <h2>Please check your email</h2>
        <p> Click the link in the email we've just sent to reset your
            password. It may take a few minutes to arrive.
        </p>
        <p> Can't find it? Check your spam folder. </p>
      </Container>
    </main>
  );
};

export default memo(CheckEmail);
