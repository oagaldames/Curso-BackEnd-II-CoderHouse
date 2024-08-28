import ticketRepository from "../persistence/dbManagers/ticket.repository.js";

const createTicketService = async (userEmail, totalCart) => {
    const newTicket = {
        amount: totalCart,
        purchaser: userEmail,
        code: Math.random().toString(36).substr(2, 9),
    };
    
    const ticket = await ticketRepository.create(newTicket);
    return ticket;
};

export { createTicketService };
