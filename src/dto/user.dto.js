export const userDto = (user) => {
    return {
        id: user._id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role,
        cartId: user.cart._id,
        cartProducts: user.cart.products,
    };
};