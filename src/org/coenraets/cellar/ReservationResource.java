package org.coenraets.cellar;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

//REST API
@Path("/reservations")
public class ReservationResource {

	ReservationDAO dao = new ReservationDAO();
	
	@GET
	//specify MIME type that will be sent back to the client
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Reservation> findAll() {
		System.out.println("findAll");
		return dao.findAll();
	}

//	@GET @Path("search/{query}")
//	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
//	public List<Wine> findByName(@PathParam("query") String query) {
//		System.out.println("findByName: " + query);
//		return dao.findByName(query);
//	}

	@GET @Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Reservation findById(@PathParam("id") String id) {
		System.out.println("findById " + id);
		return dao.findById(Integer.parseInt(id));
	}

	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Reservation create(Reservation wine) {
		return dao.create(wine);
	}

	@PUT @Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Reservation update(Reservation wine) {
		System.out.println("Doing update for reservation with id " + wine.getId());
		dao.update(wine);
		return wine;
	}
	
	@DELETE @Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public void remove(@PathParam("id") int id) {
		dao.remove(id);
	}

}
