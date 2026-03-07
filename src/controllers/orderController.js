const Order = require('../models/Order');

// Função para transformar os dados recebidos
const transformOrderData = (data) => {
  return {
    orderId: data.numeroPedido,  
    value: data.valorTotal,
    creationDate: new Date(data.dataCriacao),
    items: data.items.map(item => ({
      productId: parseInt(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem
    }))
  };
};

// Criar novo pedido
exports.createOrder = async (req, res, next) => {
  try {

    // Validar se o body veio corretamente
    if (!req.body || !req.body.numeroPedido) {
      return res.status(400).json({
        error: 'Requisição inválida',
        message: 'Dados do pedido não enviados corretamente'
      });
    }

    // Transformar os dados recebidos
    const transformedData = transformOrderData(req.body);
    
    // Verificar se já existe um pedido com o mesmo orderId
    const existingOrder = await Order.findOne({ orderId: transformedData.orderId });

    if (existingOrder) {
      return res.status(409).json({
        error: 'Conflito',
        message: 'Já existe um pedido com este número'
      });
    }
    
    // Criar o pedido no banco de dados
    const order = await Order.create(transformedData);
    
    res.status(201).json({
      message: 'Pedido criado com sucesso',
      order: order
    });

  } catch (error) {
    next(error);
  }
};

// Obter pedido por ID - VERSÃO CORRIGIDA (aceita com e sem -01)
exports.getOrderById = async (req, res, next) => {
  try {

    let orderId = req.params.id;
    
    // Tenta buscar com o ID exato primeiro
    let order = await Order.findOne({ orderId: orderId });
    
    // Se não encontrou e o ID NÃO tem "-", tenta buscar que comece com ele
    if (!order && !orderId.includes('-')) {
      // Cria regex para buscar orderId que comece com o ID + "-"
      // Ex: se buscar "v10089016vdb", encontra "v10089016vdb-01"
      const regex = new RegExp(`^${orderId}-\\d+$`);
      order = await Order.findOne({ orderId: { $regex: regex } });
    }
    
    if (!order) {
      return res.status(404).json({
        error: 'Não encontrado',
        message: 'Pedido não encontrado'
      });
    }
    
    res.status(200).json(order);

  } catch (error) {
    next(error);
  }
};

// Listar todos os pedidos
exports.getAllOrders = async (req, res, next) => {
  try {

    const orders = await Order.find().sort({ creationDate: -1 });
    
    res.status(200).json({
      count: orders.length,
      orders: orders
    });

  } catch (error) {
    next(error);
  }
};

// Atualizar pedido 
exports.updateOrder = async (req, res, next) => {
  try {

    let orderId = req.params.id;
    
    // Buscar o pedido (com mesma lógica)
    let order = await Order.findOne({ orderId: orderId });
    
    if (!order && !orderId.includes('-')) {
      const regex = new RegExp(`^${orderId}-\\d+$`);
      order = await Order.findOne({ orderId: { $regex: regex } });
    }
    
    if (!order) {
      return res.status(404).json({
        error: 'Não encontrado',
        message: 'Pedido não encontrado'
      });
    }
    
    const transformedData = transformOrderData(req.body);
    
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: order.orderId }, // Usa o orderId encontrado
      transformedData,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      message: 'Pedido atualizado com sucesso',
      order: updatedOrder
    });

  } catch (error) {
    next(error);
  }
};

// Deletar pedido 
exports.deleteOrder = async (req, res, next) => {
  try {

    let orderId = req.params.id;
    
    // Buscar o pedido
    let order = await Order.findOne({ orderId: orderId });
    
    if (!order && !orderId.includes('-')) {
      const regex = new RegExp(`^${orderId}-\\d+$`);
      order = await Order.findOne({ orderId: { $regex: regex } });
    }
    
    if (!order) {
      return res.status(404).json({
        error: 'Não encontrado',
        message: 'Pedido não encontrado'
      });
    }
    
    await Order.findOneAndDelete({ orderId: order.orderId });
    
    res.status(200).json({
      message: 'Pedido deletado com sucesso'
    });

  } catch (error) {
    next(error);
  }
};