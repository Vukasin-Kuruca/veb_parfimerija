import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4 checkout-steps">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Prijava</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Prijava</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>Dostava</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Dostava</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>Način plaćanja</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Način plaćanja</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>Potvrda porudžbine</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Potvrda porudžbine</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;