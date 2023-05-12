package com.myapp.app.repository;

import com.myapp.app.domain.Shipping;
import java.util.UUID;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Shipping entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShippingRepository extends JpaRepository<Shipping, UUID> {}
