package com.myapp.app.repository;

import com.myapp.app.domain.Cart;
import java.util.UUID;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Cart entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CartRepository extends JpaRepository<Cart, UUID> {}
