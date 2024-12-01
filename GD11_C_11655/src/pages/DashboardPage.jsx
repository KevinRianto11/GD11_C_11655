import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Modal, Button, Form, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Toaster, toast } from "sonner";

const ReservationCard = ({ namaPemesan, jumlahOrang, tanggalWaktu, status, nomorMeja, onEdit, onDelete }) => {
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "Pending":
                return "bg-warning";
            case "Confirmed":
                return "bg-success";
            case "Cancelled":
                return "bg-danger";
            default:
                return "bg-secondary";
        }
    };

    return (
        <Card className="mb-3" style={{ backgroundColor: '#f5f5f5', border: '1px solid #ddd' }}>
            <h5 className="card-title bg-primary text-white p-2 rounded">{namaPemesan}</h5>
            <Card.Body>
                <div className="border-bottom pb-2 mt-2">
                    <strong>Jumlah Orang </strong> {jumlahOrang} <br />
                </div>
                
                <div className="border-bottom pb-2 mt-2">
                    <strong>Tanggal & Waktu </strong> {new Date(tanggalWaktu).toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" })}<br /> 
                </div>
                
                <div className="border-bottom pb-2 mt-2">
                    <strong>Status </strong> <Badge className={`${getStatusBadgeClass(status)} text-white p-2 rounded`}>{status}</Badge><br />
                </div>
                
                <div className="border-bottom pb-2 mt-2">
                    <strong>Nomor Meja </strong>{nomorMeja}<br />
                </div>
                

                <div className="pt-2">
                    <Button variant="danger" size="sm" onClick={onDelete} style={{ backgroundColor: '#dc3545', border: 'none' }}>Hapus</Button>
                    <Button variant="primary" size="sm"className="float-end" onClick={onEdit} style={{ backgroundColor: '#007bff', border: 'none' }}>Edit</Button>
                </div>
                
        </Card.Body>
      </Card>
    );
};

const DashboardPage = () => {
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        namaPemesan: "",
        jumlahOrang: "",
        tanggalWaktu: "",
        status: "",
        nomorMeja: "",
        abjad: ""
    });

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(!user){
            navigate("/login");
        }
    }, [navigate]);
    
    const formatDate = (date) => {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };
        return new Date(date).toLocaleDateString("id-ID", options);
    };

    const handleClose = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData({
            namaPemesan: "",
            jumlahOrang: "",
            tanggalWaktu: "",
            status: "",
            nomorMeja: "",
            abjad: ""
        });
    };

    const handleShow = () => setShowModal(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId !== null) {
            setReservations(reservations.map(res => 
                res.id === editingId ? { ...formData, id: editingId } : res
            ));
            toast.success(`Berhasil mengubah reservasi untuk ${formData.namaPemesan}`, {
                position: "top-center",
                duration: 2000
            });
        } else {
            const newReservation = {
                ...formData,
                id: Date.now()
            };
            setReservations([...reservations, newReservation]);
            toast.success(`Berhasil menambah reservasi untuk ${formData.namaPemesan}`, {
                position: "top-center",
                duration: 2000
            });
        }
        handleClose();
    };

    const handleEdit = (reservation) => {
        setFormData(reservation);
        setEditingId(reservation.id);
        setShowModal(true);
    };

    const handleDelete = (id, name) => {
        setReservations(reservations.filter(res => res.id !== id));
        toast.success(`Berhasil menghapus reservasi untuk ${name}`, {
            position: "top-center",
            duration: 2000
        });
    };

    return (
        <Container className="mt-5">
            <Toaster 
                position="top-center"
                expand={false}
                richColors
                closeButton
            />
            <h1 className="mb-3 border-bottom fw-bold">Dashboard</h1>
            <Row className="mb-4">
                <Col md={10}>
                    <Card className="h-100">
                        <Card.Body className="d-flex flex-column justify-content-center">
                            <h4>Selamat datang,</h4>
                            <h1 className="fw-bold display-6 mb-3">{user?.username}</h1>
                            <p className="mb-0">Kamu sudah login sejak:</p>
                            <p className="fw-bold lead mb-0">{formatDate(user?.loginAt)}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card>
                        <Card.Body>
                            <p>Bukti sedang ngantor:</p>
                            <img src="https://via.placeholder.com/150" className="img-fluid rounded" alt="Tidak Ada Gambar" />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <h2 className="mb-3">Daftar Reservasi Meja</h2>
            <p>Saat ini terdapat {reservations.length} reservasi meja.</p>

            <Button variant="success" onClick={handleShow} className="mb-3 d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faPlus} /> Tambah Reservasi Meja
            </Button>

            <Row>
                {reservations.map((reservation) => (
                    <Col md={4} key={reservation.id}>
                        <ReservationCard
                            namaPemesan={reservation.namaPemesan}
                            jumlahOrang={reservation.jumlahOrang}
                            tanggalWaktu={reservation.tanggalWaktu}
                            status={reservation.status}
                            nomorMeja={reservation.status === "Confirmed" ? reservation.nomorMeja : "Menunggu Konfirmasi"}
                            onEdit={() => handleEdit(reservation)}
                            onDelete={() => handleDelete(reservation.id, reservation.namaPemesan)}
                        />
                    </Col>
                ))}
            </Row>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingId ? "Edit Reservasi Meja" : "Tambah Reservasi Meja"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Pemesan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nama Pemesan"
                                value={formData.namaPemesan}
                                onChange={(e) => setFormData({...formData, namaPemesan: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Status Reservasi</Form.Label>
                            <Form.Select
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                required
                            >
                                <option value="">Pilih Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Cancelled">Cancelled</option>
                            </Form.Select>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Tanggal dan Waktu Reservasi</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={formData.tanggalWaktu}
                                onChange={(e) => setFormData({...formData, tanggalWaktu: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Jumlah Orang</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Jumlah Orang"
                                value={formData.jumlahOrang}
                                onChange={(e) => setFormData({...formData, jumlahOrang: e.target.value})}
                                required
                            />
                        </Form.Group>

                        {formData.status === "Confirmed" && (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nomor Meja</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Nomor Meja"
                                        value={formData.nomorMeja}
                                        onChange={(e) => setFormData({...formData, nomorMeja: e.target.value})}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Abjad</Form.Label>
                                    <Form.Select
                                        value={formData.abjad}
                                        onChange={(e) => setFormData({...formData, abjad: e.target.value})}
                                        required
                                    >
                                        <option value="">Pilih Abjad</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                    </Form.Select>
                                </Form.Group>
                            </>
                        )}

                        <div className="float-end">
                            <Button variant="secondary" onClick={handleClose} className="me-2">
                                Batal
                            </Button>
                            <Button variant="primary" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {editingId ? "Simpan" : "Tambah"}
                            </Button>
                        </div> 
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default DashboardPage;