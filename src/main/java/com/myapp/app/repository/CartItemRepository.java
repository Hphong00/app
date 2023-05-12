package com.myapp.app.repository;

import com.myapp.app.domain.CartItem;
import java.util.UUID;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CartItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CartItemRepository extends JpaRepository<CartItem, UUID> {}
