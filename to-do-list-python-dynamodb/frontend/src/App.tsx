import { useState, useEffect } from 'react'
import axios from "axios";
import { Button, Col, Container, Form, ListGroup, ListGroupItem, Row, Tab, Tabs, Modal } from 'react-bootstrap';
import './App.scss';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [itemId, setItemId] = useState<string>('');
  const [showDelModal, setShowDelModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<any[]>([]);
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_URL}/tasks`);
        setTasks(response.data);
      } catch (error) {
        setResponseMessage("Error fetching data");
      }
    }
    fetchTasks();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/tasks`, {title: task});
      setTasks([...tasks, response.data]);
    } catch (error) {
      setResponseMessage("Error sending data.");
    }
    setTask('');
    setLoading(false);
  }

  const handleCheckChange = async (task:any, checked: boolean) => {
    try {
      await axios.put(`${API_URL}/tasks/${task.taskId}`, {
        ...task,
        completed: checked
      });
      setTasks(tasks.map(item => 
        item.taskId === task.taskId ? { ...item, completed: checked } : item
      ));
    } catch (error) {
      setResponseMessage("Error updating task:");
    }
  };

  const handleShowDelModal = (taskId:string) => {
    setItemId(taskId);
    setShowDelModal(true);
  }

  const handleDeleteTask = async () => {
    try {
      if (!itemId) return;

      await axios.delete(`${API_URL}/tasks/${itemId}`);
      setTasks(tasks.filter(item => item.taskId !== itemId));
    } catch (error) {
      setResponseMessage("Error deleting task:");
    }
    setShowDelModal(false);
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <header className="text-center">
              <h1>Todo List</h1>
            </header>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={3} className='d-flex flex-column align-items-center'>
            <Form className="w-100" onSubmit={handleFormSubmit}>
              <Form.Group className="md-6" controlId="formBasicEmail">
                <div className="d-flex align-items-center">
                  <Form.Control 
                    className="input-margin" 
                    type="text" 
                    placeholder="Add a task"
                    value={task}
                    onChange={handleInputChange}
                     />
                  <Button variant="primary" type="submit" disabled={loading}>
                    Add
                  </Button>
                </div>
              </Form.Group>
            </Form>
            {responseMessage && <p>{responseMessage}</p>}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={3} className='pt-3'>
            <Tabs
              defaultActiveKey="all"
              variant='underline'
              id="uncontrolled-tab-example"
              className="mb-3">
              <Tab eventKey="all" title="All">
                <ListGroup>
                  {tasks.map(task => (
                    <ListGroupItem key={task.taskId}>
                      <div className="d-flex justify-content-between align-items-center">
                        <Form.Check
                          type="checkbox"
                          id="item1"
                          name="item1"
                          onChange={(e) => handleCheckChange(task, e.target.checked)}
                          checked={task.completed}
                          label={task.title}
                        />
                        <Button 
                          variant="link" 
                          size="sm"
                          onClick={() => handleShowDelModal(task.taskId)}>
                            <i className="bi bi-trash text-danger"></i>
                          </Button>
                      </div>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Tab>
              <Tab eventKey="active" title="Active">
                <ListGroup>
                    {tasks.filter(task => !task.completed).length === 0 ? (
                      <ListGroupItem>
                        No active tasks
                      </ListGroupItem>
                    ) :
                    tasks
                      .filter(task => !task.completed)
                      .map(task => (
                      <ListGroupItem key={task.taskId}>
                        <div className="d-flex justify-content-between align-items-center">
                          <Form.Check
                            type="checkbox"
                            id="item1"
                            name="item1"
                            onChange={(e) => handleCheckChange(task, e.target.checked)}
                            checked={task.completed}
                            label={task.title}
                          />
                          <Button 
                            variant="link" 
                            size="sm"
                            onClick={() => handleShowDelModal(task.taskId)}>
                              <i className="bi bi-trash text-danger"></i>
                            </Button>
                        </div>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
              </Tab>
              <Tab eventKey="completed" title="Completed">
              <ListGroup>
                    {tasks.filter(task => task.completed).length === 0 ? (
                      <ListGroupItem>
                        No completed tasks
                      </ListGroupItem>
                    ) :
                    tasks
                      .filter(task => task.completed)
                      .map(task => (
                      <ListGroupItem key={task.taskId}>
                        <div className="d-flex justify-content-between align-items-center">
                          <Form.Check
                            type="checkbox"
                            id="item1"
                            name="item1"
                            onChange={(e) => handleCheckChange(task, e.target.checked)}
                            checked={task.completed}
                            label={task.title}
                          />
                          <Button 
                            variant="link" 
                            size="sm"
                            onClick={() => handleShowDelModal(task.taskId)}>
                              <i className="bi bi-trash text-danger"></i>
                            </Button>
                        </div>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>

      <Modal show={showDelModal} onHide={() => setShowDelModal(false)}>
        <Modal.Body>Do you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleDeleteTask()}>
            yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default App
