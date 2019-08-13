import React, { Fragment, useState, useEffect } from 'react'
import styled from 'styled-components'
import theme from '../../theme'
import { Ref, Rail, Sticky, Grid, Segment } from "semantic-ui-react";
import Cart from '../Cart/Cart'

const Container = styled.div`
  margin: 3em 10em;
  min-height: 600px;
`
const Header = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  padding: 0 4em;
  margin: auto;
  color: ${theme.color};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  
  .checkout {
    font-size: 2em;
  }
  .continue-shopping {
    cursor: pointer;
  }
`
const Steps = styled.div`
  
`

const Checkout = () => {
  const [contextRef, setContextRef] = useState(React.createRef())
  // useEffect(() => {
  //   if (!contextRef.current) {
  //     setContextRef(React.createRef())
  //   }
  // }, [contextRef])

  return (
    <Fragment>
      <Header>
        <div className="checkout">CHECKOUT</div>
        <div className="continue-shopping">Continue Shopping</div>
      </Header>
      <Container>

        <Grid columns={2}>
          <Grid.Column>
            <Ref innerRef={contextRef}>
              <Fragment>
                <Steps>
                  <Segment>1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis laboriosam doloremque iure dolorum omnis dolores doloribus qui eum, veniam error deserunt provident earum sint, laudantium harum id debitis quisquam placeat?</Segment>
                  <Segment>2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid cupiditate et laboriosam quis, at eum similique maxime eaque quia ullam alias accusamus fugiat est animi sint ducimus dolores libero explicabo?</Segment>
                  <Segment>3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quod illo culpa exercitationem expedita iure cumque explicabo impedit aspernatur quas accusantium ad minus vitae dolor, libero incidunt praesentium fugit placeat.</Segment>
                  <Segment>4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, rem. Doloremque repellat, nihil vitae necessitatibus debitis quis vero velit enim officiis nostrum? Nihil, obcaecati? Officia soluta nam ex nihil sed! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid exercitationem, adipisci ipsum incidunt temporibus asperiores praesentium, nihil, modi delectus libero sapiente obcaecati id voluptates doloribus soluta at aperiam ad non?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam perspiciatis, voluptatibus ea fugit sit qui illo reprehenderit tempore excepturi quae delectus quia sed quod repudiandae placeat quidem neque assumenda voluptatem!Loremloremlorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas esse excepturi commodi consequatur modi aut aspernatur, nihil quis temporibus officiis sint voluptatibus adipisci earum. Excepturi architecto dolorem ullam odio sequi?</Segment>
                  <Segment>4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, rem. Doloremque repellat, nihil vitae necessitatibus debitis quis vero velit enim officiis nostrum? Nihil, obcaecati? Officia soluta nam ex nihil sed! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid exercitationem, adipisci ipsum incidunt temporibus asperiores praesentium, nihil, modi delectus libero sapiente obcaecati id voluptates doloribus soluta at aperiam ad non?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam perspiciatis, voluptatibus ea fugit sit qui illo reprehenderit tempore excepturi quae delectus quia sed quod repudiandae placeat quidem neque assumenda voluptatem!Loremloremlorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas esse excepturi commodi consequatur modi aut aspernatur, nihil quis temporibus officiis sint voluptatibus adipisci earum. Excepturi architecto dolorem ullam odio sequi?</Segment>
                  <Segment>4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, rem. Doloremque repellat, nihil vitae necessitatibus debitis quis vero velit enim officiis nostrum? Nihil, obcaecati? Officia soluta nam ex nihil sed! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid exercitationem, adipisci ipsum incidunt temporibus asperiores praesentium, nihil, modi delectus libero sapiente obcaecati id voluptates doloribus soluta at aperiam ad non?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam perspiciatis, voluptatibus ea fugit sit qui illo reprehenderit tempore excepturi quae delectus quia sed quod repudiandae placeat quidem neque assumenda voluptatem!Loremloremlorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas esse excepturi commodi consequatur modi aut aspernatur, nihil quis temporibus officiis sint voluptatibus adipisci earum. Excepturi architecto dolorem ullam odio sequi?</Segment>
                  <Segment>4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, rem. Doloremque repellat, nihil vitae necessitatibus debitis quis vero velit enim officiis nostrum? Nihil, obcaecati? Officia soluta nam ex nihil sed! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid exercitationem, adipisci ipsum incidunt temporibus asperiores praesentium, nihil, modi delectus libero sapiente obcaecati id voluptates doloribus soluta at aperiam ad non?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam perspiciatis, voluptatibus ea fugit sit qui illo reprehenderit tempore excepturi quae delectus quia sed quod repudiandae placeat quidem neque assumenda voluptatem!Loremloremlorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas esse excepturi commodi consequatur modi aut aspernatur, nihil quis temporibus officiis sint voluptatibus adipisci earum. Excepturi architecto dolorem ullam odio sequi?</Segment>
                  <Segment>4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, rem. Doloremque repellat, nihil vitae necessitatibus debitis quis vero velit enim officiis nostrum? Nihil, obcaecati? Officia soluta nam ex nihil sed! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid exercitationem, adipisci ipsum incidunt temporibus asperiores praesentium, nihil, modi delectus libero sapiente obcaecati id voluptates doloribus soluta at aperiam ad non?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam perspiciatis, voluptatibus ea fugit sit qui illo reprehenderit tempore excepturi quae delectus quia sed quod repudiandae placeat quidem neque assumenda voluptatem!Loremloremlorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas esse excepturi commodi consequatur modi aut aspernatur, nihil quis temporibus officiis sint voluptatibus adipisci earum. Excepturi architecto dolorem ullam odio sequi?</Segment>
                  <Segment>4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, rem. Doloremque repellat, nihil vitae necessitatibus debitis quis vero velit enim officiis nostrum? Nihil, obcaecati? Officia soluta nam ex nihil sed! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid exercitationem, adipisci ipsum incidunt temporibus asperiores praesentium, nihil, modi delectus libero sapiente obcaecati id voluptates doloribus soluta at aperiam ad non?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam perspiciatis, voluptatibus ea fugit sit qui illo reprehenderit tempore excepturi quae delectus quia sed quod repudiandae placeat quidem neque assumenda voluptatem!Loremloremlorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas esse excepturi commodi consequatur modi aut aspernatur, nihil quis temporibus officiis sint voluptatibus adipisci earum. Excepturi architecto dolorem ullam odio sequi?</Segment>
                  <Segment>4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, rem. Doloremque repellat, nihil vitae necessitatibus debitis quis vero velit enim officiis nostrum? Nihil, obcaecati? Officia soluta nam ex nihil sed! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid exercitationem, adipisci ipsum incidunt temporibus asperiores praesentium, nihil, modi delectus libero sapiente obcaecati id voluptates doloribus soluta at aperiam ad non?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam perspiciatis, voluptatibus ea fugit sit qui illo reprehenderit tempore excepturi quae delectus quia sed quod repudiandae placeat quidem neque assumenda voluptatem!Loremloremlorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas esse excepturi commodi consequatur modi aut aspernatur, nihil quis temporibus officiis sint voluptatibus adipisci earum. Excepturi architecto dolorem ullam odio sequi?</Segment>
                  <Segment>4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, rem. Doloremque repellat, nihil vitae necessitatibus debitis quis vero velit enim officiis nostrum? Nihil, obcaecati? Officia soluta nam ex nihil sed! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid exercitationem, adipisci ipsum incidunt temporibus asperiores praesentium, nihil, modi delectus libero sapiente obcaecati id voluptates doloribus soluta at aperiam ad non?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam perspiciatis, voluptatibus ea fugit sit qui illo reprehenderit tempore excepturi quae delectus quia sed quod repudiandae placeat quidem neque assumenda voluptatem!Loremloremlorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas esse excepturi commodi consequatur modi aut aspernatur, nihil quis temporibus officiis sint voluptatibus adipisci earum. Excepturi architecto dolorem ullam odio sequi?</Segment>
                  <Segment>4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, rem. Doloremque repellat, nihil vitae necessitatibus debitis quis vero velit enim officiis nostrum? Nihil, obcaecati? Officia soluta nam ex nihil sed! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid exercitationem, adipisci ipsum incidunt temporibus asperiores praesentium, nihil, modi delectus libero sapiente obcaecati id voluptates doloribus soluta at aperiam ad non?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam perspiciatis, voluptatibus ea fugit sit qui illo reprehenderit tempore excepturi quae delectus quia sed quod repudiandae placeat quidem neque assumenda voluptatem!Loremloremlorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas esse excepturi commodi consequatur modi aut aspernatur, nihil quis temporibus officiis sint voluptatibus adipisci earum. Excepturi architecto dolorem ullam odio sequi?</Segment>
                </Steps>

                <Rail position='right'>
                  <Sticky context={contextRef}>
                    <Cart />
                  </Sticky>
                </Rail>
              </Fragment>
            </Ref>
          </Grid.Column>
        </Grid>


        {/* <Ref innerRef={contextRef}>
          <ProductsContainer>
            <Rail dividing internal position='right'>
              <Sticky context={contextRef} offset={80}>
              </Sticky>
            </Rail>
            <Steps>
              <div>1</div>
              <div>2</div>
              <div>3</div>
            </Steps>
          </ProductsContainer>
        </Ref> */}
      </Container>
    </Fragment>
  )
}

export default Checkout
