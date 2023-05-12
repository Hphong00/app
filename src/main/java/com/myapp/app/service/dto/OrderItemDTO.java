package com.myapp.app.service.dto;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

/**
 * A DTO for the {@link com.myapp.app.domain.OrderItem} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class OrderItemDTO implements Serializable {

    private UUID id;

    private UUID orderId;

    private UUID productId;

    private Integer quantity;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getOrderId() {
        return orderId;
    }

    public void setOrderId(UUID orderId) {
        this.orderId = orderId;
    }

    public UUID getProductId() {
        return productId;
    }

    public void setProductId(UUID productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrderItemDTO)) {
            return false;
        }

        OrderItemDTO orderItemDTO = (OrderItemDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, orderItemDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OrderItemDTO{" +
            "id='" + getId() + "'" +
            ", orderId='" + getOrderId() + "'" +
            ", productId='" + getProductId() + "'" +
            ", quantity=" + getQuantity() +
            "}";
    }
}
